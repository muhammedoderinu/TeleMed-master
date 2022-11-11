<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;
    use HasUuidPrimaryKey;

    protected $fillable = [
        'model_id',
        'model_type',
        'path',
        'disk',
        'description',
        'type_id',
    ];

    protected $appends = [
        'type',
        'url',
    ];

    protected $hidden = [
        'disk',
        'mediaType',
        'path',
    ];

    protected $with = [
        'mediaType:id,name',
    ];

    public $timestamps = false;

    protected static function booted()
    {
        static::creating(fn (Media $model) => $model->disk ??= 'public');

        static::deleting(fn (Media $model) => $model->deleteMedia());
    }

    public function model(): MorphTo
    {
        return $this->morphTo();
    }

    public function mediaType(): BelongsTo
    {
        return $this->belongsTo(MediaType::class, 'type_id');
    }

    protected function url(): Attribute
    {
        return Attribute::get(fn () => filter_var($this->path, FILTER_VALIDATE_URL) ? $this->path : Storage::disk($this->disk)->url($this->path));
    }

    protected function type(): Attribute
    {
        return Attribute::get(fn () => $this->mediaType->name);
    }

    protected function deleteMedia(): bool
    {
        return (bool) $this->disk && Storage::disk($this->disk)->delete($this->path);
    }
}


