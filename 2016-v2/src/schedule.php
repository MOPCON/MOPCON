<?php
function getAllSchedule()
{
    $jsonText = file_get_contents(__DIR__."/../api/schedules.json");
    $jsonArr = json_decode($jsonText,true);
    return $jsonArr;
}
