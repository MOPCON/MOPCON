<?php

namespace Tests\App\Http\Controllers\Test2020;

use TestCase;
use AspectMock\Test as test;

class AppHomeController extends TestCase
{
    private $banner;
    private $news;
    public function setUp() :void
    {
        parent::setUp();
        putenv('APP_ENV=develop');

        $dummyGoogleSheet = '{"feed": {"entry": [{ "gsx$id": { "$t": "1" }, "gsx$date": { "$t": "2018/10/20 9:00" }, "gsx$title": { "$t": "Telegram 聊天頻道上線嚕" }, "gsx$description": { "$t": "歡迎大家一起加入聊天！！" }, "gsx$link": { "$t": "tg://resolve?domain=mopcon" } }]}}';
        test::double('App\Http\Controllers\Year2019\NewsController', ['getSheetData' => $dummyGoogleSheet]);

        $path = __DIR__ . '/../../../../../resource/assets/json/2020/';
        if (env('APP_ENV') === 'production') {
            $bannerFileName = 'banner.json';
        } else {
            $bannerFileName = 'banner-dev.json';
        }
        $this->banner = json_decode(file_get_contents($path . $bannerFileName), true);
        $newsRequest = $this->get('api/2020/news')->response->getContent();
        $newsResponse = json_decode($newsRequest, true);
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/home.json', $newsResponse);
        $this->news = $newsResponse['data'] ?? [];
    }

    public function testGetAppHomeInfo()
    {
        $response = $this->get('/api/2020/home/');
        $compared = [];
        $compared['banner'] = array_map(function ($value) {
            $value['img'] = url($value['img']);
            return $value;
        }, $this->banner);

        $compared['news'] = $this->news;
        $this->assertEquals(200, $this->response->status());

        $response->seeJsonEquals([
            'success' => true,
            'message' => 'success',
            'data' => $compared
        ]);
    }

    public function tearDown() : void
    {
        test::clean();
    }
}
