<?php

namespace Tests\App\Http\Controllers\Test2020;

use TestCase;

use AspectMock\Test as test;

class NewsControllerTest extends TestCase
{
    public function setUp() : void
    {
        parent::setUp();
        putenv('APP_ENV=develop');
        $dummyGoogleSheet = '{"feed": {"entry": [{ "gsx$id": { "$t": "1" }, "gsx$date": { "$t": "2018/10/20 9:00" }, "gsx$title": { "$t": "Telegram 聊天頻道上線嚕" }, "gsx$description": { "$t": "歡迎大家一起加入聊天！！" }, "gsx$link": { "$t": "tg://resolve?domain=mopcon" } }]}}';
        test::double('App\Http\Controllers\Year2019\NewsController', ['getSheetData' => $dummyGoogleSheet]);
    }

    public function testAllNews()
    {
        $response = $this->call('GET', '/api/2019/news');
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(true, $result['success']);
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/news.json', $response->getContent());
    }

    public function testSpecificNews()
    {
        $id = '1';
        $response = $this->call('GET', '/api/2019/news/' . $id);
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(true, $result['success']);
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/news-show.json', $response->getContent());
    }

    public function testWrongSpecificNews()
    {
        $id = 'abc';
        $response = $this->call('GET', '/api/2019/news/' . $id);
        $result = json_decode($response->getContent(), true);
        $this->assertEquals(false, $result['success']);
    }

    public function tearDown() : void
    {
        test::clean();
    }
}
