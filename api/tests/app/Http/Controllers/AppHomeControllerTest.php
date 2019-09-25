<?php

namespace Tests\App\Http\Controllers;

use TestCase;

class AppHomeController extends TestCase
{
    public function testGetAppHomeInfo()
    {
        $response = $this->get('/api/2019/home/');

        $response->seeJsonStructure([
            'success',
            'message',
            'data' => [
                'banner',
                'news',
            ]
        ]);
    }
}
