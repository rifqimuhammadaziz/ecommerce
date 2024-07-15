<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PaymentNotificationController extends Controller
{
    public function hit(Request $request)
    {
        $invoice = Invoice::where('order_id', $request->order_id)->first();
        // SHA512(order_id+status_code+gross_amount+ServerKey)
        $signature_key = hash('sha512', $request->order_id . $request->status_code . $invoice->gross_amount . '.00' . config('services.midtrans.server_key'));
        if ($request->signature_key == $signature_key) {
            // Update invoice
            $invoice->update([
                'succeeded_at' => $request->settlement_time,
            ]);

            // Update cart
            Cart::whereIn('id', $invoice->cart_ids)->update([
                'paid_at' => now(),
            ]);

            Cache::forget('carts_global_count');
        } else {
            $invoice->update([
                'payment_info' => 'HASH KEY TIDAK MATCH'
            ]);
        }
        // $invoice->update([
        //     'payment_info' => 'API BERMASALAH'
        // ]);
    }
}
