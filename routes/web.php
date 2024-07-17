<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentNotificationController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('products/me', [ProductController::class, 'mine'])->middleware('auth')->name('products.mine');
Route::resource('products', ProductController::class);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::controller(CartController::class)->group(function () {
        Route::get('carts', 'index')->name('cart');
        Route::post('carts/add-to-cart/{product:slug}', 'store')->name('cart.store');
        Route::delete('carts/delete/{cart}', 'destroy')->name('cart.delete');
    });

    Route::controller(InvoiceController::class)->group(function () {
        Route::post('invoice', 'store')->name('invoice.store');
        Route::get('invoice/{invoice:order_id}', 'show')->name('invoice.show');
    });
});

Route::post('api/notification/handling', [PaymentNotificationController::class, 'hit']);


require __DIR__ . '/auth.php';
