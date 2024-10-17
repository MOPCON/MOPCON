<?php

namespace Tests\App\Http\Controllers\Test2020;

use TestCase;

class UnconfControllerTest extends TestCase
{
    public function setUp() : void
    {
        parent::setUp();
        putenv('APP_ENV=develop');
    }
    public function testAllUnconf()
    {
        $response = $this->call('GET', '/api/2020/unconf');
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(true, $result['success']);
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/unconf.json', $response->getContent());
    }

    public function testSpecificUnconf()
    {
        $id = '2020101';
        $response = $this->call('GET', '/api/2020/unconf/' . $id);
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(true, $result['success']);
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/unconf-show.json', $response->getContent());
    }

    public function testSpecificTagsUnconf()
    {
        $tags = ['Blockchain'];
        $response = $this->call('GET', '/api/2020/unconf/tags=' . implode(',', $tags));
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(false, $result['success']);
    }

    public function testWrongSpecificUnconf()
    {
        $id = '2019000';
        $response = $this->call('GET', '/api/2020/unconf/' . $id);
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(false, $result['success']);
    }
    public function testWrongTagsUnconf()
    {
        $tags = ['abcz'];
        $response = $this->call('GET', '/api/2020/unconf/tags=' . implode(',', $tags));
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(false, $result['success']);
    }
}
