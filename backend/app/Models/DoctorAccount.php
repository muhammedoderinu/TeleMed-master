<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DoctorAccount extends Model
{
    use HasFactory;
    use HasUuidPrimaryKey;

    protected $fillable = [
        'specialization',
        'pin',
        'user_id', 
    ];

    protected $hidden = [
        'pin'
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

  
   



}
