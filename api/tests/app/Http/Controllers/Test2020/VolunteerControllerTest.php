<?php

namespace Tests\App\Http\Controllers\Test2020;

use TestCase;

class VolunteerController extends TestCase
{
    private $dataset;
    public function setUp() :void
    {
        parent::setUp();
        putenv('APP_ENV=develop');

        if (env('APP_ENV') === 'production') {
            $this->dataset = json_decode(file_get_contents(__DIR__ . '/../../../../../resource/assets/json/2020/volunteer.json'), true);
        } else {
            $this->dataset = json_decode(file_get_contents(__DIR__ . '/../../../../../resource/assets/json/2020/volunteer-dev.json'), true);
        }
    }

    public function testGetVolunteerList()
    {
        $response = $this->get('/api/2020/volunteer/');
        $compared = [];
        $compared['volunteer'] = array_map(function ($value) {
            $value['photo'] = url($value['photo']);
            unset($value['introduction'], $value['introduction_en'], $value['members'], $value['facebook'], $value['twitter'], $value['instagram'], $value['telegram'], $value['event']);
            return $value;
        }, $this->dataset);

        $filterCompared = [
            'success' => true,
            'message' => 'success',
            'data' => $compared
        ];

        $this->assertEquals(200, $this->response->status());
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/volunteer.json', $filterCompared);

        $response->seeJsonEquals($filterCompared);
    }

    public function testGetVolunteer()
    {
        $volunteers = $this->dataset;
        $id = rand(1, count($volunteers));
        $response = $this->get('/api/2020/volunteer/' . $id);
        $compared = $this->searchTargetById($volunteers, $id);

        $filterCompared = [
            'success' => true,
            'message' => 'success',
            'data' => $compared
        ];

        $this->assertEquals(200, $this->response->status());
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/volunteer-show.json', $filterCompared);

        $response->seeJsonEquals($filterCompared);
    }

    public function testGetVolunteerWithNoExistId()
    {
        $volunteers = $this->dataset;
        $id = count($volunteers) + 1;
        $response = $this->get('/api/2020/volunteer/' . $id);

        $this->assertEquals(404, $this->response->status());

        $response->seeJsonEquals([
            'success' => false,
            'message' => 'Not found',
            'data' => [],
        ]);
    }

    public function testGetVolunteerWithWrongIdType()
    {
        $volunteers = $this->dataset;
        $id = "info_team";
        $response = $this->get('/api/2020/volunteer/' . $id);

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
        if (isset($result['introduction_en']) && $result['introduction_en'] === '') {
            $result['introduction_en'] = $result['introduction'];
        }
        unset($result['id']);

        return $result;
    }
}
