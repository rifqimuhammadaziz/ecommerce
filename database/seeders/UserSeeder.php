<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                "name" => "Rifqi Muhammad Aziz",
                "email" => "rifqi@mail.com",
                "password" => bcrypt("password"),
                "email_verified_at" => now()
            ],
            [
                "name" => "Developer A",
                "email" => "developer_a@mail.com",
                "password" => bcrypt("password"),
                "email_verified_at" => now()
            ],
        ])->each(fn($user) => User::create($user));
    }
}
