<?php

use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Service;
use App\Models\User;


uses(RefreshDatabase::class);

beforeEach(fn () => $this->service = Service::factory()->create());

test('can create service')->assertDatabaseCount(Service::class, 1);

it('has  a review', function() {
    Review::factory()->create(['service_id' => $this->service->id]);
    $this->assertInstanceOf(Review::class, $this->service->review); 
});

it('belongs to a doctor', function() {
    $this->assertInstanceOf(User::class, $this->service->doctor); 
});

it('belongs to a patient', function() {
    $this->assertInstanceOf(User::class, $this->service->patient); 
});


