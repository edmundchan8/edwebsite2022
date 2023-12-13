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
        Schema::table('stock_data', function (Blueprint $table) {
            $table->integer('dividendDate')->nullable();
            $table->decimal('fiftyDayAverage', 10, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('stock_data', function (Blueprint $table) {
            $table->dropColumn('dividendDate');
            $table->dropColumn('fiftyDayAverage');
        });
    }
};
