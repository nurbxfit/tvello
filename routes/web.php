<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Tasks\BoardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    // temporary 
    // Board routes
    Route::get('boards', [BoardController::class, 'boards'])->name('boards');
    Route::get('boards/{boardId}', [BoardController::class, 'board'])->name('board'); // Fixed name
    Route::post('boards', [BoardController::class, 'create'])->name('boards.create'); // Better naming
    Route::put('boards/{boardId}', [BoardController::class, 'update'])->name('boards.update');
    Route::delete('boards/{boardId}', [BoardController::class, 'delete'])->name('boards.delete');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
