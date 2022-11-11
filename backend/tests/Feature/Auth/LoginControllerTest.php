<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

   

    public function test_users_can_authenticate_using_the_login_screen()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/login-user', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        $this->assertDatabaseCount(User::class, 1);

        $auth_user = User::where('email',$user->email)->first();
        $email = $auth_user->email;
        $password = $auth_user->password;

        $this->assertEquals('password', $password);
        $this->assertEquals($user->email, $auth_user->email);
    
       
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->post('/login-user', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }
}

