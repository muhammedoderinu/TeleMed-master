<?php

use App\Models\Review;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\DoctorAccount;

uses(RefreshDatabase::class);

beforeEach(fn () => $this->user = User::factory()->create());

test('can create service')->assertDatabaseCount(User::class, 1);


it('has  an account', function() {
    DoctorAccount::factory()->create(['user_id' => $this->user->id]);
    $this->assertInstanceOf(DoctorAccount::class, $this->user->account); 
});



