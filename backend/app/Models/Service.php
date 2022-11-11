<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;
    use HasUuidPrimaryKey;
    protected $fillable = [
        'title',
        'user_id'
    ];

    public function review(): HasOne {
        return $this->hasOne(Review::class);
    }

    public function doctor() :BelongsTo{
        return $this->belongsTo(User::class, 'doctor_id');   
    }

    public function patient(): BelongsTo{
        return $this->belongsTo(User::class, 'patient_id');
    }
}
