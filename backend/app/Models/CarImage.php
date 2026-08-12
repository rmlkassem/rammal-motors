<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarImage extends Model
{
    protected $fillable = [
        'car_id',
        'image_path',
        'imagekit_file_id',
        'position',
    ];

    protected $appends = [
        'image_url',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    public function getImageUrlAttribute(): string
    {
        return $this->image_path;
    }
}