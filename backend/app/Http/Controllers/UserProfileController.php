<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\MediaType;

class UserProfileController extends Controller
{

    public function show(Request $request){
        $user =   $request->user()->load([ 'headerImage', 'avatarImage']);
        return (['user'=> $user]);
        
       
    }
    public function store(Request $request){
       $data =  $request->validate([
            'phone' => 'nullable|numeric',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'avatar' => 'nullable|file|image',
            'header' => 'nullable|file|image',
        ]);


        /** @var User $user */
        $user = $request->user();

        if($request->hasFile('avatar')|| $request->hasFile('avatar')){
            $type = MediaType::where('name', 'image')->first();

            if($request->file('avatar')){
                $path = $request->file('avatar')->storePublicly(User::mediaDir(), $disk = User::mediaDisk());
                $avatarData = ['path' => $path, 'disk' => $disk, 'type_id' => $type->id];
                $user->avatarImage()->updateOrCreate(['description' => 'avatar'], $avatarData);
            
            }

            if ($request->hasFile('header')) {
                $path = $request->file('header')->storePublicly(User::mediaDir(), $disk = User::mediaDisk());
                $avatarData = ['path' => $path, 'disk' => $disk, 'type_id' => $type->id];
                $user->headerImage()->updateOrCreate(['description' => 'header'], $avatarData);
            }

            
            return (['user' => $user]);
            

        }

        $data = collect($data)->except(['avatar', 'header'])->filter()->all();

         $user->update($data);
        return (['user' =>$user]);

       



    }


}
