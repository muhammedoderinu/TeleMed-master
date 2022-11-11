<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Contracts\Auth\MustVerifyEmail as AuthMustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasUuidPrimaryKey;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'phone',
        'city',
        'address'
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'avatarImage',
        'headerImage',
        
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $with = [
        'avatarImage',
    ];

    protected $appends = [
        'avatar_url',
        'header_url',
        
    ];

    public function  account(): HasOne {
        return $this->hasOne(DoctorAccount::class);
    }

    public static function mediaDir(): string
    {
        return 'users';
    }

    public static function mediaDisk(): string
    {
        return config('filesystems.media');
    }


    public function avatarImage(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')
        ->where('description', 'avatar');
    }

    public function headerImage(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')
        ->where('description', 'header');
    }

    protected function avatarUrl(): Attribute
    {
        return Attribute::get(fn () => $this->relationLoaded('avatarImage') ? $this->avatarImage?->url ?? null : null);
    }

    protected function headerUrl(): Attribute
    {
        return Attribute::get(fn () => $this->relationLoaded('headerImage') ? $this->headerImage?->url ?? null : null);
    }

    public function chats(): BelongsToMany
    {
        return $this->belongsToMany(Chat::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function inAppNotifications(): HasMany
    {
        return $this->hasMany(InAppNotification::class);
    }


  
}
