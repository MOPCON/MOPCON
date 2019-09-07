<?php

namespace App\Http\Controllers;

use App\Service\SpeakerService;
use Illuminate\Http\Response;

class SpeakerController extends Controller
{
    use ApiTrait;

    protected $function = 'speaker';

    private $service;

    public function __construct()
    {
        parent::__construct();
        $sessionFileName = env('APP_ENV') === 'production' ? '/session.json' : '/session-dev.json';
        $sessionAry = json_decode(file_get_contents($this->path . $sessionFileName), true);
        $this->service = new SpeakerService($sessionAry);
        foreach ($this->jsonAry as &$row) {
            $row = $this->service->parse($row);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->returnSuccess('Success.', $this->jsonAry);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        try {
            foreach ($this->jsonAry as $speaker) {
                if ((int) $speaker['speaker_id'] === $id) {
                    return $this->returnSuccess('Success.', $speaker);
                }
            }

            return $this->returnNotFoundError('Not found');
        } catch (\Exception $e) {
            return $this->returnError($e->getMessage());
        }
    }

    public function imagesView($platform, $name)
    {
        $dir = $this->imgPath . 'speaker/'. $platform . '/' . $name . '.*';
        $path = glob($dir);
        $path = end($path);
        $type = mime_content_type($path);
        return (new Response(file_get_contents($path), 200))->header('Content-Type', $type);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTags()
    {
        try {
            $tags = [];
            foreach ($this->jsonAry as $speaker) {
                $tags = array_merge($tags, array_column($speaker['tags'], 'name'));
            }

            return $this->returnSuccess('Success.', $this->service->parseTags(array_values(array_unique($tags))));
        } catch (\Exception $e) {
            $this->returnError($e->getMessage());
        }
    }
}
