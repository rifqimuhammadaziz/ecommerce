<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => $name = 'PHP',
                'slug' => str($name)->slug(),
            ],
            [
                'name' => $name = 'Java',
                'slug' => str($name)->slug(),
            ],
            [
                'name' => $name = 'Go',
                'slug' => str($name)->slug(),
            ],
            [
                'name' => $name = 'Javascript',
                'slug' => str($name)->slug(),
            ],
            [
                'name' => $name = 'Laravel',
                'slug' => str($name)->slug(),
            ]
        ])->each(fn($category) => Category::create($category));
    }
}
