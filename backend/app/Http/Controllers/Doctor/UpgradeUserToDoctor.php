<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\DoctorAccount;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;

class UpgradeUserToDoctor extends Controller
{

    public function store(Request $request){
      $data =   $request->validate([
           'specialization' => 'required',
           'pin'  => 'required'
      ]);

      $specialization = $request->input('specialization');
      $pin = $request->input('pin');

      $account = DoctorAccount::where('pin', '=', $pin)->first();
      if (!$account) {
      return response()->json(['success'=>false, 'message' => 'Login Fail, please check pin']);
      }
      if (!Hash::check($pin, $account->pin)) {
      return response()->json(['success'=>false, 'message' => 'Login Fail, pls check password']);
      }
      return response()->json(['success'=>true,'message'=>'success', 'data' => $account]);




    }
}

