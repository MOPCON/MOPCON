<?php
function getAllCommunities()
{
    $jsonText = file_get_contents(__DIR__."/../api/community.json");
    $jsonArr = json_decode($jsonText,true);
    $returnArr = [];
    foreach($jsonArr as $info) {
        if($info['image']!='') {
            $id = strtolower(pathinfo($info['image'],PATHINFO_FILENAME));
        } else {
            continue; //異常
        }
        $returnArr[$id] = $info;
    }
    return $returnArr;
}
