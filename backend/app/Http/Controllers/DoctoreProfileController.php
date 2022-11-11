<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DoctoreProfileController extends Controller
{
    public function index(Request $request){
        $user = $request->user();
        if ($user->account()->doesntExist()) {
            return back()->with('error', 'user does not have a professional account');
        }

        $user =  $user->load('account');
        return (['user' => $user]);
    }

    
}
