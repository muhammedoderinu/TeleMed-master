<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;
    use HasUuidPrimaryKey;
    protected $fillable =[
        'comment',
        'rating',
        'service_id',
        'user_id'
    ];

    public function service(): BelongsTo{
        return $this->belongsTo(Service::class);
    }

   
}

