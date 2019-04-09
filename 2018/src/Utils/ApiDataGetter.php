<?php
namespace MopCon2018\Utils;

class ApiDataGetter
{
    /*
        在沒有 static file 的情況下可以 call 此 class 完成下載 static file 
        usage: 
            $getter = new ApiDataGetter(); 資料就從網路上抓回來
    */
    protected $baseDir;
    protected $jsonList;
    protected $api;
    protected $apiData;
    public function __construct()
    {
        $this->baseDir = '../../assets/json/';
        $this->jsonList = ['Sponsor','Community','Volunteer','Carousel','News','Speaker'];
        $this->api = new Api();
        $this->apiData = [
            $this->api->getSponsor(),
            $this->api->getCommunity(),
            $this->api->getVolunteer(),
            $this->api->getCarousel(),
            $this->api->getNews(),
            $this->api->getSpeaker()
        ];
        foreach($jsonList as $key => $items)
        {
            $JoinPath = $baseDir.$items.'.json';
            $tempJson = $apiData[$key];
            $fp = fopen($JoinPath, 'w');
            fwrite($fp, $tempJson);
            fclose($fp);
        }
    }
    /*
        獲得往存放 json 資料夾的路徑 
        usage: 
            $path = $getter->getPath();
    */
    public function getPath(){
        return $this->baseDir;
    }
}
