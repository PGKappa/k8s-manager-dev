<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOperatorIdToManagerUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('manager_users', function (Blueprint $table) {
            // $table->string('operator_id')->nullable();
            $table->foreignId('operator_id')->nullable()->references('id')->on('operators');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('manager_user', function (Blueprint $table) {
            $table->dropColumn('operator_id');
        });
    }
}
