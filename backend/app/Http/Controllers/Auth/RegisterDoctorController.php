<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegisterDoctorController extends Controller
{
    public function store(Request $request){
      $data =   $request->validate([
           'specialization' => 'required',
           'pin' => 'required'
      ]);
  
    /** @var User $user */
    if (!$request->user()->account()->doesntExist()) {
      return back()->with('error', 'user already have a professional account');
  }
    $account = $request->user()->account();
    $account->create($data);
    // $request->user()
    // ->update(['specialization' => $request->specialization, 'pin' => $request->pin]);
    // DB::commit();
    
    return;
      
    }
}
