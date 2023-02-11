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
        Schema::table('revenue', function (Blueprint $table) {
            $table->float('mum');
            $table->float('yauyau');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('revenue', function (Blueprint $table) {
            $table->dropColumn('mum');
            $table->dropColumn('yauyau');
        });
    }
};
