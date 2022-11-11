<?php

namespace Tests\Feature\Auth;

use App\Models\DoctorAccount;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UpgradeUserToDoctorControllerTest extends TestCase
{
    use RefreshDatabase;

   

    public function test_users_can_upgrade_account_to_doctor_account()
    {
        $account = DoctorAccount::factory()->create();

        $response = $this->postJson('/api/upgrade', [
            'specialization' => $account->specialization,
            'pin' =>Hash::make($account->pin),
        ]);
    
        $this->assertDatabaseCount(DoctorAccount::class, 1);

        $auth_account = DoctorAccount::first();
        $specialization = $auth_account->specialization;
        $pin = $auth_account->pin;

        $this->assertEquals($account->pin, $pin);
        $this->assertEquals($account->specialization, $specialization);
        $response->assertStatus(200);
       
    }
}