<?php
namespace MopConApi2018\App\Models;

use \Illuminate\Database\Eloquent\Model;

class FieldgameBoothMission extends Model
{
    protected $table = 'filegame_booth_missions';
    protected $primaryKey = 'mission_id';

    public function isCorrectPasswd($passwd)
    {
        return $passwd == $this->passwd;
    }

    public function isActive($now = null)
    {
        $nowstamp = $now ?: strtotime('now');
        return strtotime($this->started_at) <= $nowstamp && $nowstamp <= strtotime($this->expired_at);
    }

    public function toApiFormat($user_mission_progress = null)
    {
        $status = 0;
        if ($this->isActive()) {
            $status = 1;
            if (isset($user_mission_progress[$this->mission_id])) {
                $status = -1;
                if (isset($user_mission_progress[$this->mission_id]['state']) && $user_mission_progress[$this->mission_id]['state']) {
                    $status = 2;
                }
            }
        }

        $data = [
            'id' => $this->mission_id . 'm',
            'type' => 'task',
            'title' => $this->mission,
            'description' => $this->mission_info,
            'banner_url' => null,
            'options' => null,
            'status' => $status,
            'answer' => null,
            'unlock_time' => strtotime($this->started_at),
            // optional
            'booth' => $this->booth_name,
            'boothinfo' => $this->booth_info,
        ];

        if ($status == 0) {
        }

        return $data;
    }
}
