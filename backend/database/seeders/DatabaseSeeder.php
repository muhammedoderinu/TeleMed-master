<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DoctorCategories;
use Illuminate\Database\Seeder;
use App\Models\DocumentType;
use App\Models\MediaType;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $document_types = collect(['certificate', 'licence'])->map(fn (string $name) => compact('name'))->all();
        DocumentType::upsert($document_types, 'name');

        $mediaTypes = collect(['image', 'video'])->map(fn (string $name) => compact('name'))->all();
        MediaType::upsert($mediaTypes, 'name');

        $doctorCategories = collect(['Physician', 'dentist'])->map(fn (string $name) => compact('name'))->all();
        DoctorCategories::upsert($doctorCategories, 'name');


    }
}
