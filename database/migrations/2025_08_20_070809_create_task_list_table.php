<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('task_list', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->integer('order');
            
            $table->uuid('board_id');
            $table->foreign('board_id')->references('id')->on('task_board')->onDelete('cascade');
            
            $table->timestamps();
            
            // Add index on board_id for better query performance
            $table->index('board_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_list');
    }
};
