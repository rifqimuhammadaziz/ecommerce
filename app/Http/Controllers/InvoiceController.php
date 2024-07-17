<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class InvoiceController extends Controller
{
    public function store(Request $request)
    {
        $total = (int) round($request->total, 0); // 147025
        $cart_ids = $request->collect('carts')->pluck('id');
        // $order_id = 'order' . '2222' . $request->user()->id . '-' . $cart_ids->implode('');
        $order_id = 'order' . now()->format('Y') . $request->user()->id . $cart_ids->implode('');

        $invoiceExists = Invoice::where('order_id', $order_id)->firstOr(fn() => false);
        if ($invoiceExists) {
            return to_route('invoice.show', $invoiceExists);
        } else {
            // create/update invoice to database
            $invoice = Auth::user()->invoices()->updateOrCreate(compact('order_id'), [
                'order_id' => $order_id,
                'gross_amount' => $total,
                'cart_ids' => $cart_ids,
                'payment_type' => $request->payment_type,
            ]);

            // construct data for send to midtrans
            $data = [
                'payment_type' => $request->payment_type,
                'transaction_details' => [
                    'gross_amount' => $total,
                    'order_id' => $order_id,
                ],
                'customer_details' => [
                    'email' => $request->user()->email,
                    'first_name' => $request->user()->name,
                ],
                'item_details' => $request->collect('carts')->map(fn($item) => [
                    'id' => $item['id'],
                    'price' => (int) round((11 / 100) * $item['price'], 0) + $item['price'], // 147026
                    'quantity' => 1,
                    'name' => $item['product']['name'],
                ]),
            ];

            if ($request->payment_type == 'bank_transfer') {
                $data = [
                    ...$data,
                    'bank_transfer' => [
                        'bank' => $request->bank,
                    ]
                ];
            }

            // $hitung = $request->collect('carts')->map(fn($item) => [
            //     (int) round((11 / 100) * $item['price'], 0) + $item['price'],
            // ]);
            // dd($total);

            // get response from midtrans to fetch payment instruction (qrcode/va)
            $response = Http::withBasicAuth(config('services.midtrans.server_key') . ':', '')
                ->post('https://api.sandbox.midtrans.com/v2/charge', $data);
            $body = $response->json();
            // dd($body);

            // update database (value of payment_info is array)
            $invoice->update([
                'payment_info' => [
                    'qr_code' => $request->payment_type == 'gopay' ? $body['actions'][0]['url'] : null,
                    'bank' => $request->payment_type !== 'gopay' ? [
                        'name' => $body['va_numbers'][0]['bank'],
                        'va_number' => $body['va_numbers'][0]['va_number'],
                    ] : null,
                ]
            ]);

            // dd($response->json());
            $response->json();
        }

        return to_route('invoice.show', $invoice);
    }

    public function show(Invoice $invoice)
    {
        // return $invoice;
        return inertia('Invoice/Show', [
            'invoice' => new InvoiceResource($invoice)
        ]);
    }
}
