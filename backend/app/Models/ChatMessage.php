<?php

namespace App\Models;

use App\Models\Traits\HasUuidPrimaryKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class ChatMessage extends Model
{
    use HasFactory;
    use HasUuidPrimaryKey;

    protected $fillable = [
        'content',
        'chat_id',
        'user_id',
        'edited_at',
    ];

    protected $touches = ['chat'];

    public static function mediaDir(): string
    {
        return 'messages';
    }

    public static function mediaDisk(): string
    {
        return config('filesystems.media');
    }

    public function chat(): BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }

    public function media(): MorphMany
    {
        return $this->morphMany(Media::class, 'model');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function notification(): HasOne{
        return $this->belongTo(ChatNotification::class);
    }

}
