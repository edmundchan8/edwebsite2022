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
        // make following columns nullable
        Schema::table('stock_data', function (Blueprint $table) {
            $table->string('analystRating')->nullable()->change();
            $table->string('analystOpinion')->nullable()->change();
            $table->string('dividendRate')->nullable()->change();
            $table->decimal('forwardPE', 10, 2)->nullable()->change();
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
            $table->string('analystRating');
            $table->string('analystOpinion');
            $table->string('dividendRate');
            $table->decimal('forwardPE', 10, 2);
        });
    }
};
