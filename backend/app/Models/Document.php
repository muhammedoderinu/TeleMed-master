<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;
    use HasUuidPrimaryKey;

    protected $fillable = [
        'user_id',
        'type_id'
    ];
     
    public function doctor(): BelongsTo{
        return $this->belongsTo(DoctorAccount::class);
    }

    public function type(): BelongsTo{
        return $this->belongsTo(DocumentType::class);
    }


}
