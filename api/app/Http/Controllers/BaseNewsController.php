<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiTrait;

class BaseNewsController extends Controller
{
    use ApiTrait;

    private $rawMap;
    private $columns = ['id', 'date', 'title', 'description', 'link'];
    public function __construct()
    {
        $url = "https://sheets.googleapis.com/v4/spreadsheets/" . env($this->year . '_NEWS_ID') . "/values/sheet1?alt=json&key=" . env('SHEET_API_KEY');
        $this->rawMap = $this->mapSheetData(json_decode($this->getSheetData($url), true)['values']);
    }
    /**
     * 取得 APP news API data
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->returnSuccess('Success.', $this->rawMap);
    }
    public function show($id)
    {
        if ($id < 1 || !is_numeric($id)) {
            return $this->returnError('Bad request');
        }
        if (isset($this->rawMap[$id - 1])) {
            return $this->returnSuccess('Success.', $this->rawMap[$id - 1]);
        }
        return $this->returnNotFoundError();
    }
    /**
     * request google sheet
     * @param String
     * @return String
     */
    private function getSheetData(string $url)
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 3,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => [
                'cache-control: no-cache',
            ],
        ]);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            throw new \Exception("cURL Error #:$err");
        }

        return $response;
    }
    /**
     * convert array into news data and id map
     * @param Array
     * @return Array
     */
    private function mapSheetData(array $rawArr): array
    {
        $result = [];
        for ($i = 1; $i < count($rawArr); $i++) {
            $temp = [];
            for ($j = 0; $j < count($rawArr[0]); $j++) {
                if ($rawArr[0][$j] == "date") {
                    $temp[$rawArr[0][$j]] = strtotime($rawArr[$i][$j]);
                } else {
                    $temp[$rawArr[0][$j]] = $rawArr[$i][$j];
                }
            }
            array_push($result, $temp);
        }
        
        return $result;
    }
}
