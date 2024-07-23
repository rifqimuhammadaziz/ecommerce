<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('invoice.paid.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
