<?php
namespace MopCon2018\Utils;

class Api
{
    protected $staticJson;

    public function __construct()
    {
        $this->staticJson = __DIR__ . '/../../assets/json/';
    }

    public function getSchedule()
    {
        return file_get_contents($this->staticJson . 'Schedule.json');
    }

    public function getSpeaker()
    {
        return file_get_contents($this->staticJson . 'Speaker.json');
    }

    public function getSponsor()
    {
        return file_get_contents($this->staticJson . 'Sponsor.json');
    }

    public function getScheduleUnconf()
    {
        return file_get_contents($this->staticJson . 'ScheduleUnconf.json');
    }

    public function getCommunity()
    {
        return file_get_contents($this->staticJson . 'Community.json');
    }

    public function getVolunteer()
    {
        return file_get_contents($this->staticJson . 'Volunteer.json');
    }

    public function getCarousel()
    {
        return file_get_contents($this->staticJson . 'Carousel.json');
    }

    public function getNews()
    {
        return file_get_contents($this->staticJson . 'News.json');
    }
}
