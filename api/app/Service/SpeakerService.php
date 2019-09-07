<?php

namespace App\Service;

class SpeakerService
{
    private $tagGroup = [
        'design' => [
            'UI/UX',
        ],
        'other' => [
            'Startup',
        ],
        'tech' => [],
    ];
    private $tagGroupColor = [
        'design' => '#98ce02',
        'other' => '#ff4492',
        'tech' => '#01aaf0',
    ];
    private $hidden_fields = [
        'photo_for_speaker_web',
        'photo_for_speaker_mobile',
        'photo_for_session_web',
        'photo_for_session_mobile',
        'photo_for_sponsor_web',
        'photo_for_sponsor_mobile',
        'tags',
    ];
    private $sessionSpeakerMapping = [];

    public function __construct(array $sessionAry)
    {
        foreach ($sessionAry as $schedule) {
            foreach ($schedule['period'] as &$period) {
                if (empty($period['room'])) {
                    continue;
                }
                foreach ($period['room'] as $room) {
                    if (is_array($room['speaker_id'])) {
                        foreach ($room['speaker_id'] as $id) {
                            $this->sessionSpeakerMapping[$id] = $room['session_id'];
                        }
                        continue;
                    }
                    $this->sessionSpeakerMapping[$room['speaker_id']] = $room['session_id'];
                }
            }
        }
    }

    public function getSessionSpeakerMapping(): array
    {
        return $this->sessionSpeakerMapping;
    }

    public function parse(array $row, string $type = 'speaker')
    {
        $row['session_id'] = $this->sessionSpeakerMapping[$row['speaker_id']] ?? 0;
        $tags = $this->parseTags($row['tags']);
        $filterKeys = [
            'photo_for_' . $type . '_web',
            'photo_for_' . $type . '_mobile'
        ];
        foreach ($filterKeys as $filterkey) {
            if (!filter_var($filterkey, FILTER_VALIDATE_URL)) {
                $row[$filterkey] = url($row[$filterkey]);
            }
        }
        $row['img'] = [
            'web' => $row['photo_for_' . $type . '_web'],
            'mobile' => $row['photo_for_' . $type . '_mobile'],
        ];
        foreach ($row as $key => $value) {
            if (in_array($key, $this->hidden_fields)) {
                unset($row[$key]);
            }
        }
        $row['tags'] = $tags;

        return $row;
    }

    public function parseTags(array $tags): array
    {
        $result = [];
        foreach ($tags as $tag) {
            $found = false;
            foreach ($this->tagGroup as $type => $groupTags) {
                if (in_array($tag, $groupTags)) {
                    $result[] = [
                        'color' => $this->tagGroupColor[$type],
                        'name' => $tag,
                    ];
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $result[] = [
                    'color' => $this->tagGroupColor['tech'],
                    'name' => $tag,
                ];
            }
        }

        return $result;
    }
}
