<?php
namespace MopConApi2018\App\Models;

use \Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $incrementing = false;
    protected $primaryKey = 'uuid';
    protected $casts = [
        'mission_progress' => 'array',
        'quiz_progress' => 'array'
    ];

    public function isMissionComplete($mission_id)
    {
        $result = array_filter(
            $this->mission_progress ?: [],
            function ($value, $key) use ($mission_id) {
                return $key == $mission_id && $value['state'] == true;
            },
            ARRAY_FILTER_USE_BOTH
        );

        return !empty($result);
    }

    public function isQuizComplete($quiz_id)
    {
        $result = array_filter(
            $this->quiz_progress ?: [],
            function ($value, $key) use ($quiz_id) {
                return $key == $quiz_id && $value['state'] == true;
            },
            ARRAY_FILTER_USE_BOTH
        );

        return !empty($result);
    }

    public function getQuizWriting($quiz_id)
    {
        $result = array_filter(
            $this->quiz_progress ?: [],
            function ($value, $key) use ($quiz_id) {
                return $key == $quiz_id;
            },
            ARRAY_FILTER_USE_BOTH
        );

        $writing = null;
        if (!empty($result)) {
            $writing = array_values($result)[0]['answer'];
        }
        return $writing;
    }

    public function passbook()
    {
        return $this->hasMany('MopConApi2018\App\Models\UserPassbook', 'uuid');
    }
}
