<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Tasks\BoardController;
use App\Http\Controllers\Tasks\ListController;
use App\Http\Controllers\Tasks\ListsController;
use App\Http\Controllers\Tasks\CardController;

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
    Route::post('boards', [BoardController::class, 'create'])->name('boards.create'); 
    Route::get('boards/{boardId}', [BoardController::class, 'board'])->name('board'); 
    Route::put('boards/{boardId}', [BoardController::class, 'update'])->name('boards.update');
    Route::delete('boards/{boardId}', [BoardController::class, 'delete'])->name('boards.delete');
    
    Route::post('boards/{boardId}/lists', [ListController::class, 'store'])->name('board.lists.store'); 
    Route::put('boards/{boardId}/lists', [ListsController::class, 'update'])->name('board.lists.updateMany'); 
    Route::put('boards/{boardId}/lists/{listId}', [ListController::class, 'update'])->name('board.lists.update'); 
    Route::delete('boards/{boardId}/lists/{listId}', [ListController::class, 'destroy'])->name('board.lists.destroy'); 
    
    // Route::post("boards/{boardId}/lists/{listId}/cards",[CardController::class,'store'])->name("board.lists.cards.store");
    // Route::put('boards/{boardId}/lists/{listId}/cards/{cardId}', [CardController::class, 'update'])->name('board.lists.cards.update'); 
    // Route::delete('boards/{boardId}/lists/{listId}/cards/{cardId}', [CardController::class, 'destroy'])->name('board.lists.cards.destroy'); 
    Route::resource('boards.lists.cards',CardController::class)->only(['store','update','destroy']);
    // Custom bulk update route
    Route::put('boards/{boardId}/lists/{listId}/cards', [CardController::class, 'updateMany'])
        ->name('boards.lists.cards.updateMany');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
