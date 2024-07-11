<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::resource('products', ProductController::class);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('carts', [CartController::class, 'index'])->name('cart');
    Route::post('carts/add-to-cart/{product:slug}', [CartController::class, 'store'])->name('cart.store');
    Route::delete('carts/delete/{cart}', [CartController::class, 'destroy'])->name('cart.delete');

    Route::post('invoice', [InvoiceController::class, 'store'])->name('invoice.store');
    Route::get('invoice/{invoice:order_id}', [InvoiceController::class, 'show'])->name('invoice.show');
});

require __DIR__ . '/auth.php';
