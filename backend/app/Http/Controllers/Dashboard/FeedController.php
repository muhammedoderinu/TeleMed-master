<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\DoctorAccount;

class FeedController extends Controller
{
    public function show(Request $request){

       $user =  $request->user()->load(['account','headerImage']);
       return (['user' => $user]);

    }
}
