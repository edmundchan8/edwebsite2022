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
        Schema::create('stock_data', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tickerSymbol');
            $table->decimal('price', 10, 2);
            $table->decimal('twoHundredDayAverage', 10, 2);
            $table->string('analystRating');
            $table->string('analystOpinion');
            $table->string('dividendRate');
            $table->decimal('forwardPE', 10, 2);
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
