<?php

namespace Tests\App\Http\Controllers\Test2019;

use TestCase;

class SponsorController extends TestCase
{
    private $dataset;

    public function setUp() : void
    {
        parent::setUp();
        putenv('APP_ENV=develop');
    }

    public function tearDown() : void
    {
        putenv('APP_ENV=testing');
    }

    public function testGetAllSponsor()
    {
        $response = $this->call('GET', '/api/2019/sponsor');
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(true, $result['success']);
    }

    public function testGetSpecificSponsor()
    {
        $data = [];
        $id = ['1', '2'];
        $response = $this->call('GET', '/api/2019/sponsor?sponsor_id=' . implode(',', $id));
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(true, $result['success']);
    }

    public function testGetWrongSpecificSponsor()
    {
        $data = [];
        $id = ['aaa', 'bbb'];
        $response = $this->call('GET', '/api/2019/sponsor?sponsor_id=' . implode(',', $id));
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(false, $result['success']);
    }
}
