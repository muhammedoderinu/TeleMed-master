<?php

use App\Models\DoctorAccount;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
uses(RefreshDatabase::class);

beforeEach(fn () => $this->account = DoctorAccount::factory()->create());

test('will create doctor_account')
   ->assertDatabaseCount(DoctorAccount::class, 1);


it('belongs to a user', function(){
    expect($this->account->user)->toBeInstanceOf(User::class);
});




