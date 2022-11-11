<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

uses(RefreshDatabase::class);

it('can read user', function () {

    $user = User::factory()->create();

    $this->actingAs($user = User::factory()->create())
        ->get(route('feed.show'))
        ->assertOk();

});