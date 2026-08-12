<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnalyticsController;

// PUBLIC ROUTES

Route::get('/cars', [CarController::class, 'index']);

Route::get('/cars/{id}', [CarController::class, 'show']);

Route::post('/login', [AuthController::class, 'login']);


// ADMIN ROUTES

Route::middleware('auth:sanctum')->group(function () {

    Route::get(
        '/admin/cars',
        [CarController::class, 'adminIndex']
    );

    Route::post(
        '/cars',
        [CarController::class, 'store']
    );

    Route::put(
        '/cars/{id}',
        [CarController::class, 'update']
    );

    Route::delete(
        '/cars/{id}',
        [CarController::class, 'destroy']
    );

    Route::post(
        '/cars/{id}/images',
        [CarController::class, 'addImages']
    );

    Route::delete(
        '/car-images/{id}',
        [CarController::class, 'deleteImage']
    );

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );
    Route::put('/cars/{car}/sold', [CarController::class, 'markAsSold']);
    Route::put('/cars/{car}/available', [CarController::class, 'markAsAvailable']);

    Route::get(
        '/admin/analytics',
        [AnalyticsController::class, 'index']
    );

});