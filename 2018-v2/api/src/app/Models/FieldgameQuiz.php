<?php
namespace MopConApi2018\App\Models;

use \Illuminate\Database\Eloquent\Model;

class FieldgameQuiz extends Model
{
    protected $table = 'filegame_quizzes';
    protected $primaryKey = 'quiz_id';
    protected $casts = [
        'choices' => 'array',
    ];

    /**
     * @param int|string $answer   可能會是答案，或是選項的順序
     * @param bool       $useIndex
     * @return bool
     */
    public function isCorrectAnswer($answer, $useIndex = true)
    {
        if ($useIndex) {
            $is_correct = isset($this->choices[$answer - 1]) && ($this->choices[$answer - 1] == $this->answer);
        } else {
            $is_correct = $answer == $this->answer;
        }
        return $is_correct;
    }

    public function isActive($now = null)
    {
        $nowstamp = $now ?: strtotime('now');
        return strtotime($this->started_at) <= $nowstamp && $nowstamp <= strtotime($this->expired_at);
    }

    public function toApiFormat($user_quiz_progress = null)
    {
        $status = 0;
        if ($this->isActive()) {
            $status = 1;
            if (isset($user_quiz_progress[$this->quiz_id])) {
                $status = -1;
                if (isset($user_quiz_progress[$this->quiz_id]['state']) && $user_quiz_progress[$this->quiz_id]['state']) {
                    $status = 2;
                }
            }
        }

        $choices = array_combine(range(1, count($this->choices)), $this->choices);
        $answer = array_filter($choices, function ($option) {
            return $option == $this->answer;
        });
        $data = [
            'id' => $this->quiz_id . 'q',
            'type' => 'quiz',
            'title' => $this->quiz,
            'description' => null,
            'banner_url' => null,
            'quiz' => $this->quiz,
            'options' => $choices,
            'answer' => $answer,
            /////////////////////////////////////////////////// 這個麻煩，稍後處理; 活動挑戰時間 優先於 挑戰進展
            'status' => $status,
            'unlock_time' => strtotime($this->started_at),
            'userinfo' => $user_quiz_progress[$this->quiz_id] ?: new \stdClass
        ];

        if ($status == 0) {
            unset($data['title']);
            unset($data['quiz']);
            unset($data['options']);
            unset($data['answer']);
        }

        return $data;
    }
}
