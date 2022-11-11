<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LoginUserController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Dashboard\FeedController;
use App\Http\Controllers\DoctorCategoriesController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\RegisterDoctorController;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Chat\ChatMessageController;
use App\Http\Controllers\Doctor\DoctorAccountController;
use App\Http\Controllers\Doctor\UpgradeUserToDoctor;
use App\Http\Controllers\videoServiceController;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/email/verify', function () {
})->middleware('auth')->name('verification.notice');

Route::post('video-service', [VideoServiceController::class, 'index']);
Route::get('meeting', [VideoServiceController::class, 'generate']);
Route::post('create/{user}', [VideoServiceController::class, 'store']);

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request){
    $request->fulfill();
})->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/register', [RegisterUserController::class, 'store']);
Route::post('/login-user',  [LoginUserController::class, 'index']);


Route::post('/register-doctor',[ RegisterDoctorController::class, 'store']);
Route::post('/upgrade', [UpgradeUserToDoctor::class, 'store']);
Route::get('/doctors', [DoctorAccountController::class,'index']);

Route::middleware('auth:sanctum')->get('/patient', [FeedController::class, 'show'])->name('feed.show');
Route::middleware('auth:sanctum')->get('/profile', [UserProfileController::class, 'show']);
Route::middleware('auth:sanctum')->post('/profile-store', [UserProfileController::class, 'store']);

Route::middleware('auth:sanctum')->get('/chats', [ChatController::class, 'index'])->name('chats.index');
Route::middleware('auth:sanctum')->post('/chats', [ChatController::class, 'store']);
Route::get('/chats-show/{chat}', [ChatController::class, 'show'])->name('chats-show');
Route::get('/chats-index/{client}', [ChatMessageController::class, 'index']);
Route::post('/chats-message/{chat}', [ChatMessageController::class, 'store'])->name('chats-message.show');
Route::get('doctor-categories',[DoctorCategoriesController::class, 'index']);

Broadcast::routes( [ 'middleware' => ['api', 'auth:sanctum']]);

//Broadcast::routes(['middleware' => ['auth:sanctum']]);


