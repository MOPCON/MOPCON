<?php

namespace Tests\App\Http\Controllers\Test2020;

use TestCase;

class CommunityControllerTest extends TestCase
{
    private $dataset;
    public function setUp() :void
    {
        parent::setUp();
        putenv('APP_ENV=develop');

        if (env('APP_ENV') === 'production') {
            $this->dataset = json_decode(file_get_contents(__DIR__ . '/../../../../../resource/assets/json/2020/community.json'), true);
        } else {
            $this->dataset = json_decode(file_get_contents(__DIR__ . '/../../../../../resource/assets/json/2020/community-dev.json'), true);
        }
    }

    public function testGetCommunityList()
    {
        $response = $this->get('/api/2020/community/');
        $compared = [];
        array_walk($this->dataset, function ($subset, $key) use (&$compared) {
            $compared[$key] = array_map(function ($value) {
                $value['photo'] = url($value['photo']);
                unset($value['introduction'], $value['introduction_e'], $value['facebook'], $value['twitter'], $value['instagram'], $value['telegram'], $value['event']);
                return $value;
            }, $subset);
        });

        $this->assertEquals(200, $this->response->status());
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/community.json', $response->response->getContent());

        $response->seeJsonEquals([
            'success' => true,
            'message' => 'success',
            'data' => $compared
        ]);
    }

    public function testGetOrganizerWithNoExistId()
    {
        $communities = $this->dataset['community'];
        $id = count($communities) + 1;
        $response = $this->get('/api/2020/community/organizer/' . $id);

        $this->assertEquals(404, $this->response->status());

        $response->seeJsonEquals([
            'success' => false,
            'message' => 'Not found',
            'data' => [],
        ]);
    }

    public function testGetOrganizerWithWrongIdType()
    {
        $communities = $this->dataset['community'];
        $id = "GDC";
        $response = $this->get('/api/2020/community/organizer/' . $id);

        $this->assertEquals(400, $this->response->status());

        $response->seeJsonEquals([
            'success' => false,
            'message' => 'Bad request',
            'data' => [],
        ]);
    }

    public function testGetParticipant()
    {
        $participants = $this->dataset['participant'];
        $id = rand(1, count($participants));
        $response = $this->get('/api/2020/community/participant/' . $id);
        $compared = $this->searchTargetById($participants, $id);

        $this->assertEquals(200, $this->response->status());
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/community-par.json', $response->response->getContent());

        $response->seeJsonEquals([
            'success' => true,
            'message' => 'success',
            'data' => $compared,
        ]);
    }

    public function testGetParticipantWithNoExistId()
    {
        $participants = $this->dataset['participant'];
        $id = count($participants) + 1;
        $response = $this->get('/api/2020/community/participant/' . $id);

        $this->assertEquals(404, $this->response->status());

        $response->seeJsonEquals([
            'success' => false,
            'message' => 'Not found',
            'data' => [],
        ]);
    }

    public function testGetParticipantWithWrongIdType()
    {
        $participants = $this->dataset['participant'];
        $id = "AAPD";
        $response = $this->get('/api/2020/community/participant/' . $id);

        $this->assertEquals(400, $this->response->status());

        $response->seeJsonEquals([
            'success' => false,
            'message' => 'Bad request',
            'data' => [],
        ]);
    }

    private function searchTargetById($dataset, $targetId)
    {
        $result = array_filter($dataset, function ($subset) use ($targetId) {
            if ((int)$subset['id'] === (int)$targetId) {
                return true;
            }
        });

        $result = array_pop($result);

        if (isset($result['photo']) && $result['photo'] !== '') {
            $result['photo'] = url($result['photo']);
        }

        if (isset($result['introduction_e']) && $result['introduction_e'] === '') {
            $result['introduction_e'] = $result['introduction'];
        }
        unset($result['id']);

        return $result;
    }
}
