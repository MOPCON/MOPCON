<?php

namespace Tests\App\Http\Controllers\Test2019;

use TestCase;

class InitialControllerTest extends TestCase
{
    /**
     * @dataProvider provider
     */
    public function testGetInitialAPI($env)
    {
        /** arrange **/
        putenv('APP_ENV=' . $env);

        /** action **/
        $response = $this->call('GET', '/api/2019/initial');
        $result = json_decode($response->getContent(), true);

        /** assert **/
        $this->assertEquals(true, $result['success']);
        $this->assertTrue(array_key_exists('api_server', $result['data']));
        $this->assertTrue(array_key_exists('enable_game', $result['data']));
    }

    public function provider()
    {
        return [
            [
                'production',
            ],
            [
                'develop',
            ],
        ];
    }
}
