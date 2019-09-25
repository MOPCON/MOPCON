<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AppHomeController extends Controller
{
    use ApiTrait;

    protected $function = 'banner';
    private $newsAry;

    public function __construct()
    {
        parent::__construct();
        $response = app(NewsController::class)->index();
        $this->newsAry = $response->getData()->data ?? [];
    }

    public function index()
    {
        $result = [];

        $result['banner'] = array_map(function ($value) {
            $value['img'] = url($value['img']);
            return $value;
        }, $this->jsonAry);

        $result['news'] = $this->newsAry;
        return $this->returnSuccess('success', $result);
    }

    public function show($name)
    {
        $dir = $this->imgPath . 'banner/' . $name . '.*';
        $path = glob($dir);
        $path = end($path);
        $type = mime_content_type($path);
        return (new Response(file_get_contents($path), 200))->header('Content-Type', $type);
    }
}
