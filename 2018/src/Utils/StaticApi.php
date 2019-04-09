<?php

namespace MopCon2018\Utils;

class StaticApi extends Api
/*
    取代原本 Api 使用靜態檔案，介面與 Api 完全相同，內部實作不一樣而已。
*/
{
    protected $baseDir;
    public function __construct()
    {
        $this->baseDir = '../../assets/json/';
    }
    public function getSponsor()
    {
        $JoinPath = $this->baseDir.'Sponsor.json';
        if(!file_exists($JoinPath)){
            $getter = new ApiDataGetter();
        }
        $JsonString = file_get_contents($JoinPath);
        return json_decode($JsonString, true);
    }
    public function getCommunity()
    {
        $JoinPath = $this->baseDir.'Community.json';
        if(!file_exists($JoinPath)){
            $getter = new ApiDataGetter();
        }
        $JsonString = file_get_contents($JoinPath);
        return json_decode($JsonString, true);
    }
    public function getVolunteer()
    {
        $JoinPath = $this->baseDir.'Volunteer.json';
        if(!file_exists($JoinPath)){
            $getter = new ApiDataGetter();
        }
        $JsonString = file_get_contents($JoinPath);
        return json_decode($JsonString, true);
    }
    public function getCarousel()
    {
        $JoinPath = $this->baseDir.'Carousel.json';
        if(!file_exists($JoinPath)){
            $getter = new ApiDataGetter();
        }
        $JsonString = file_get_contents($JoinPath);
        return json_decode($JsonString, true);
    }
    public function getNews()
    {
        $JoinPath = $this->baseDir.'News.json';
        if(!file_exists($JoinPath)){
            $getter = new ApiDataGetter();
        }
        $JsonString = file_get_contents($JoinPath);
        return json_decode($JsonString, true);
    }
    public function getSpeaker()
    {
        $JoinPath = $this->baseDir.'Speaker.json';
        if(!file_exists($JoinPath)){
            $getter = new ApiDataGetter();
        }
        $JsonString = file_get_contents($JoinPath);
        return json_decode($JsonString, true);
    }
}