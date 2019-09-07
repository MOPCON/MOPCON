<?php

namespace App\Http\Controllers;

use App\Service\SpeakerService;
use App\Service\SessionService;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    use ApiTrait;

    protected $function = 'session';
    protected $session_keys = [
        'speaker_id',
        'name',
        'name_e',
        'company',
        'company_e',
        'job_title',
        'job_title_e',
        'img',
        'topic',
        'topic_e',
        'started_at',
        'ended_at',
        'tags',
        'is_keynote',
        'recordable',
        'level',
        'room',
        'floor',
        'sponsor_id',
        'summary',
        'summary_e',
    ];
    protected $locations = [
        'R1' => '3F一廳',
        'R2' => '4F二廳',
        'R3' => '4F三廳',
    ];
    private $sessions;
    private $sponsors;
    private $sessionSpeakerMapping = [];
    private $speakerService;

    public function __construct()
    {
        parent::__construct();
        if (env('APP_ENV') === 'production') {
            $speaker_resource_path = $this->path . 'speaker.json';
            $sponsor_resource_path = $this->path . 'sponsor.json';
        } else {
            $speaker_resource_path = $this->path . 'speaker-dev.json';
            $sponsor_resource_path = $this->path . 'sponsor-dev.json';
        }

        $speakers = json_decode(file_get_contents($speaker_resource_path), true);
        $sponsors = json_decode(file_get_contents($sponsor_resource_path), true);
        $this->sponsors = [];
        foreach ($sponsors as $sponsor) {
            $this->sponsors[(int) $sponsor['sponsor_id']] = [
                'name' => $sponsor['name'],
                'name_e' => $sponsor['name_e'],
                'logo_path' => $sponsor['logo_path'],
            ];
        }
        $this->speakerService = new SpeakerService($this->jsonAry);
        $this->sessionSpeakerMapping = $this->speakerService->getSessionSpeakerMapping();
        $this->sessions = $this->transSpeakerToSession($speakers);
    }

    /**
     * 取得議程表
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        foreach ($this->jsonAry as &$schedule) {
            foreach ($schedule['period'] as &$period) {
                if (empty($period['room'])) {
                    continue;
                }
                foreach ($period['room'] as &$room) {
                    $room = $this->sessions[$room['session_id']];
                }
            }
        }
        return $this->returnSuccess('success', $this->jsonAry);
    }

    /**
     * 議程資訊
     *
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!is_numeric($id)) {
            return $this->returnError('Bad request');
        }
        if (isset($this->sessions[$id])) {
            return $this->returnSuccess('success', $this->sessions[$id]);
        }
        return $this->returnNotFoundError();
    }

    /**
     * 取得議程清單
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function getSessionList(Request $request)
    {
        $tags = $request->input('tags', '');
        if ($tags === '') {
            return $this->returnSuccess('success', array_values($this->sessions));
        }
        $tags = explode(',', $tags);
        $output = array_filter($this->sessions, function ($session) use ($tags) {
            $filters = [];
            foreach ($session['tags'] as $row) {
                $filters[] = $row['name'];
            }
            $intersect = array_intersect($tags, $filters);
            return $tags === $intersect;
        });

        return $this->returnSuccess('success', array_values($output));
    }

    /**
     * 由講者資訊取得議程資訊
     *
     * @param array $speakers
     * @return array
     */
    private function transSpeakerToSession(array $speakers)
    {
        $sessions = [];
        foreach ($speakers as $speaker) {
            $output = $this->speakerService->parse($speaker, 'session');
            $session = array_filter($output, function ($key) {
                return in_array($key, $this->session_keys);
            }, ARRAY_FILTER_USE_KEY);
            if (isset($this->sponsors[$speaker['sponsor_id']])) {
                $session['sponsor_info'] = $this->sponsors[$speaker['sponsor_id']];
            }
            $session_id = $this->sessionSpeakerMapping[$speaker['speaker_id']] ?? 0;
            $session['session_id'] = $session_id;
            $this->convertToMultipleSpeaker($sessions, $session, $session_id);
        }

        return $sessions;
    }

    /**
     * @param array $sessions
     * @param array $session
     * @param int   $session_id
     */
    private function convertToMultipleSpeaker(array &$sessions, array &$session, int $session_id): void
    {
        if (!isset($sessions[$session_id])) {
            $session['speakers'] = [];
            $session['speakers'][] = SessionService::transportMultipleSpeaker($session);
            $sessions[$session_id] = $session;
        } else {
            $sessions[$session_id]['speakers'][] = SessionService::transportMultipleSpeaker($session);
        }
    }
}
