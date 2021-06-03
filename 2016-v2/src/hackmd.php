<?php
/**
 * 只記錄 hackmd 及 slideshow
 * @return array
 */
function getAllHackmd()
{
    $jsonText = file_get_contents(__DIR__."/../api/hackmd.json");
    $jsonArr = json_decode($jsonText, true);
    $returnArr = [];
    foreach($jsonArr as $info) {
    	  $tempArr = [];
    	  $tempArr['hackmd'] = $info['hackmd'];
    	  $tempArr['slideshow'] = $info['slideshow'];
        $returnArr[$info['speakerid']] = $tempArr;
    }
    
    return $returnArr;
}
