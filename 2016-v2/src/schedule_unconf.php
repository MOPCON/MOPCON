<?php
function getScheduleUnconf()
{
    $jsonText = file_get_contents(__DIR__."/../api/schedules_unconf.json");
    $jsonArr = json_decode($jsonText,true);
    return $jsonArr;
}
