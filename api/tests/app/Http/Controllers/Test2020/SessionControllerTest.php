<?php

namespace Tests\App\Http\Controllers\Test2020;

use TestCase;

class SessionController extends TestCase
{
    private $dataset;
    private $speakers;
    private $sessions;
    protected $session_keys = [
        'speaker_id',
        'name',
        'name_e',
        'company',
        'company_e',
        'job_title',
        'job_title_e',
        'summary',
        'summary_e',
        'photo_for_session_web',
        'photo_for_session_mobile',
        'topic',
        'topic_e',
        'link_slide',
        'started_at',
        'ended_at',
        'tags',
        'is_keynote',
        'recordable',
        'level',
    ];
    protected $tags_design = [
        'UI/UX',
    ];
    protected $tags_other = [
        'Startup',
    ];
    protected $locations = [
        'R1' => '3F一廳',
        'R2' => '4F二廳',
        'R3' => '4F三廳',
    ];

    public function setUp() :void
    {
        parent::setUp();
        putenv('APP_ENV=develop');

        $path = __DIR__ . '/../../../../../resource/assets/json/2020';
        if (env('APP_ENV') === 'production') {
            $this->dataset = json_decode(file_get_contents($path . '/session.json'), true);
            $this->speakers = json_decode(file_get_contents($path . '/speaker.json'), true);
        } else {
            $this->dataset = json_decode(file_get_contents($path . '/session-dev.json'), true);
            $this->speakers = json_decode(file_get_contents($path . '/speaker-dev.json'), true);
        }

        $this->sessions = $this->transSpeakerToSession($this->speakers);
    }

    public function testGetSessionSchedule()
    {
        $response = $this->get('/api/2020/session/');
        $this->assertEquals(200, $this->response->status());
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/session.json', $response->response->getContent());
    }

    public function testGetSessionList()
    {
        $response = $this->get('/api/2019/session/list');
        $this->assertEquals(200, $this->response->status());
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/session-list.json', $response->response->getContent());
    }

    public function testGetSessionListWithTags()
    {
        $id = rand(1, count($this->sessions));
        $tags = implode(',', ['ai', 'cloud']);
        $response = $this->get('/api/2020/session/list?tags=' . $tags);
        $compared = array_values($this->sessions);

        $this->assertEquals(200, $this->response->status());
    }

    public function testGetSessionListWithNoExistTags()
    {
        $id = rand(1, count($this->sessions));
        $tags = implode(['qwdfwe','acvbb']);
        $response = $this->get('/api/2020/session/list?tags=' . $tags);

        $this->assertEquals(200, $this->response->status());

        $response->seeJsonEquals([
            'success' => true,
            'message' => 'success',
            'data' => [],
        ]);
    }

    public function testGetSession()
    {
        $response = $this->get('/api/2020/session/2020037');
        $this->assertEquals(200, $this->response->status());
    }

    public function testGetSessionWithNoExistId()
    {
        $response = $this->get('/api/2020/session/100');

        $this->assertEquals(404, $this->response->status());
    }

    public function testGetSessionWithWrongIdType()
    {
        $id = "test";
        $response = $this->get('/api/2020/session/' . $id);

        $this->assertEquals(400, $this->response->status());

        $response->seeJsonEquals([
            'success' => false,
            'message' => 'Bad request',
            'data' => [],
        ]);
    }

    private function transSpeakerToSession(array $speakers)
    {
        $index = 1;
        $sessions = [];
        foreach ($speakers as $speaker) {
            $session = [];
            $session['session_id'] = $index;
            $session['room'] = $speaker['room'];
            $session['location'] = $this->locations[$speaker['room']];
            foreach ($this->session_keys as $key) {
                if ($key === 'tags') {
                    $session['tags_design'] = $session['tags_other'] = $session['tags_tech'] = [];
                    continue;
                }
                $session[$key] = $speaker[$key];
            }
            foreach ($speaker['tags'] as $tag) {
                if (in_array($tag, $this->tags_design)) {
                    $session['tags_design'][] = $tag;
                    continue;
                }
                if (in_array($tag, $this->tags_other)) {
                    $session['tags_other'][] = $tag;
                    continue;
                }
                $session['tags_tech'][] = $tag;
            }

            $session['is_sponsor_session'] = (bool)$speaker['sponsor_id'];
            $sessions[$index++] = $session;
        }
        return $sessions;
    }
}
