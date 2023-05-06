<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use PGVirtual\Manager\Models\ManagerUser;

class ManagerUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $levels = ['root', 'admin', 'support', 'analyst'];
        foreach ($levels as $level) {
            ManagerUser::firstOrCreate([
                'username' => $level,
                'password' => Hash::make('password'),
                'level' => $level,
                'language_id' => '2',
                'operator_id' => $level == 'root' ? null : '1',
                'enabled' => true,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
                "operator_id" => $level != "root" ? 1 : null
            ]);
        }
    }
}
