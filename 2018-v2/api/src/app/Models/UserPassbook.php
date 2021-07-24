<?php
namespace MopConApi2018\App\Models;

use \Illuminate\Database\Eloquent\Model;

class UserPassbook extends Model
{
    protected $table = 'user_passbook';
    protected $fillable = ['uuid', 'summary', 'deposit', 'withdrawal'];

    public function user()
    {
        return $this->belongsTo('MopConApi2018\App\Models\User');
    }
}
