<?php

namespace App\Http\Controllers;

use App\Events\InvoicePaid;
use App\Models\Cart;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PaymentNotificationController extends Controller
{
    public function hit(Request $request)
    {
        // get invoice by order id
        $invoice = Invoice::where('order_id', $request->order_id)->first();

        // SHA512(order_id+status_code+gross_amount+ServerKey)
        $signature_key = hash('sha512', $request->order_id . $request->status_code . $invoice->gross_amount . '.00' . config('services.midtrans.server_key'));

        // check response from midtrans
        if ($request->signature_key == $signature_key) {
            if ($request->transaction_status == 'settlement') {
                // Update invoice
                $invoice->update([
                    'status' => $request->transaction_status,
                    'succeeded_at' => $request->settlement_time,
                ]);

                // Update cart
                $cartQuery = Cart::query()->whereIn('id', $invoice->cart_ids);
                $cartQuery->update([
                    'paid_at' => now(),
                ]);

                // attach paid product to user_product table
                $product_ids = $cartQuery->pluck('product_id');
                $user = User::find($invoice->user_id);
                $user->products()->attach($product_ids);

                // broadcast event to handle auto redirect after paid
                broadcast(new InvoicePaid($invoice));
                Cache::flush();
            }
        } else {
            $invoice->update([
                'payment_info' => 'HASH KEY TIDAK MATCH'
            ]);
        }

    }
}
