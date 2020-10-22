<?php

namespace Tests\App\Http\Controllers\Test2020;

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
        $response = $this->call('GET', '/api/2020/initial');
        $result = json_decode($response->getContent(), true);

        /** assert **/
        $this->assertEquals(true, $result['success']);
        $this->assertTrue(array_key_exists('api_server', $result['data']));
        $this->assertTrue(array_key_exists('enable_game', $result['data']));
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('2020/initial.json', $response->getContent());
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
