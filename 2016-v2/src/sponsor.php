<?php
function getAllSponsors()
{
    $jsonText = file_get_contents(__DIR__."/../api/sponsors.json");
    $jsonArr = json_decode($jsonText,true);
    return $jsonArr;
}
