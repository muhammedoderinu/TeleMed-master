<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Document;
use App\Models\DocumentType;

uses(RefreshDatabase::class);


beforeEach(fn () => $this->model = Document::factory()->create());
test('it will create a document table')->assertDatabaseCount(Document::class, 1);

it ('belongs to a documentType', function() {
    expect($this->model->type)->toBeInstanceOf(DocumentType::class);

});

