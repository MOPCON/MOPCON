<?php

namespace Tests\App\Http\Controllers;

use TestCase;

class SpeakerControllerTest extends TestCase
{
    /**
     * @dataProvider envProvider
     */
    public function testGetSpeakerAPI($env, $assertCount)
    {
        /** arrange */
        putenv('APP_ENV=' . $env);

        /** act */
        $response = $this->call('GET', '/api/2019/speaker');
        $result = json_decode($response->getContent(), true);

        /** assert **/
        $this->assertEquals(true, $result['success']);
        $this->assertEquals($assertCount, count($result['data']));
        $this->assertJsonStringValidatedAgainstJsonSchemaFile('speaker.json', $response->getContent());
    }

    public function testResourceFileNotFound()
    {
        /** arrange */
        putenv('RESOURCE_PATH=' . __DIR__ . '/../../../');

        /** act */
        $response = $this->call('GET', '/api/2019/speaker');
        $result = json_decode($response->getContent(), true);

        /** assert **/
        $this->assertEquals(false, $result['success']);
        $this->assertEquals(404, $response->getStatusCode());
    }

    public function testGetSpeakerDetail()
    {
        /** arrange */
        putenv('APP_ENV=develop');

        /** act */
        $response = $this->call('GET', '/api/2019/speaker/1');
        $result = json_decode($response->getContent(), true);

        /** assert **/
        $this->assertEquals(true, $result['success']);
        $this->assertNotEmpty($result['data']);
    }

    public function testGetTags()
    {
        /** arrange */
        putenv('APP_ENV=develop');

        /** act */
        $response = $this->call('GET', '/api/2019/speaker/tags');
        $result = json_decode($response->getContent(), true);
        $expected = [
            ['color' => '#01aaf0', 'name' => 'Blockchain'],
            ['color' => '#01aaf0', 'name' => 'IoT'],
            ['color' => '#ff4492', 'name' => 'Startup'],
            ['color' => '#01aaf0', 'name' => 'Mobile App'],
            ['color' => '#01aaf0', 'name' => 'AI'],
            ['color' => '#01aaf0', 'name' => 'Web'],
            ['color' => '#98ce02', 'name' => 'UI/UX'],
            ['color' => '#01aaf0', 'name' => 'AR/VR'],
            ['color' => '#01aaf0', 'name' => 'DevOps'],
            ['color' => '#01aaf0', 'name' => 'Security'],
            ['color' => '#01aaf0', 'name' => 'Assembly'],
            ['color' => '#01aaf0', 'name' => 'Virtual Machine'],
            ['color' => '#01aaf0', 'name' => 'BigData']
        ];

        /** assert **/
        $this->assertEquals(true, $result['success']);
        $this->assertEquals($expected, $result['data']);
    }

    public function envProvider()
    {
        return [
            [
                'develop',
                29
            ],
        ];
    }

    public function tearDown(): void
    {
        putenv('APP_ENV=testing');
        putenv('RESOURCE_PATH');
    }
}
