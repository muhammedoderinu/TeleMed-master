<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Auth\Middleware\Authorize;

class LoginUserController extends Controller
{
    public function index(LoginRequest $request){

        $request->authenticate();
        
        return;
    
    }

}
