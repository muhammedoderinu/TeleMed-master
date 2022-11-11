<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Service;
use App\Models\User;
use App\Models\Review;

uses(RefreshDatabase::class);

beforeEach(fn () => $this->review = Review::factory()->create());

test('can create review')->assertDatabaseCount(Review::class, 1);

it('belongs to service ', function () {
    expect($this->review->service)->toBeInstanceOf(Service::class);
});

it('belongs to doctor ', function () {
    expect($this->review->service)->toBeInstanceOf(Service::class);
});


