<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_Data', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tickerSymbol');
            $table->decimal('price', 10, 2);
            $table->decimal('200DaySMA', 10, 2);
            $table->string('AnalystRating');
            $table->date('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_Data');
    }
};
