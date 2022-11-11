<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\DoctorAccount;
use Illuminate\Http\Request;

class DoctorAccountController extends Controller
{
    public function index(){
        $accounts = DoctorAccount::all();
        $doctors = $accounts->load(['user'=>['chats']]);
        
        return (['doctors' => $doctors]);
    }
}
