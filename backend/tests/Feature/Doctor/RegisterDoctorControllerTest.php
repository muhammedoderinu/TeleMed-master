<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\DoctorAccount;

uses(RefreshDatabase::class);

it('cant register a Doctor more than once', function() {
    $input = [
        'specialization' => fake()->word(),
        'pin'            => fake()->numerify('####')
    ];

    $account = DoctorAccount::factory()->create();

    $user = $account->user;

    $this->actingAs($user)
        ->post('/api/register-doctor', $input)
            ->assertStatus(302);
    

});

it('can register a Doctor ', function() {
    $input = [
        'specialization' => fake()->word(),
        'pin'            => fake()->numerify('####')
    ];

    $user = User::factory()->create();
    $this->actingAs($user)
        ->post('/api/register-doctor', $input)
            ->assertOk();
    

});