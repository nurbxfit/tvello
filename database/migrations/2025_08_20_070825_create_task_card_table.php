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
        Schema::create('task_card', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->integer('order');
            $table->text('description')->nullable();
            
            $table->uuid('list_id');
            $table->foreign('list_id')->references('id')->on('task_list')->onDelete('cascade');
            
            $table->timestamps();
            
            // Add index on list_id for better query performance
            $table->index('list_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_card');
    }
};
