<?php
include __DIR__ . '/../src/init.php';
$api = [];
$api['isSucc'] = true;
$appVersion = 1;
$api['menu'] = [
    // "schedule",
    // "sponsor",
    "speaker",
    "location",
    "community",
    "cfp",
    "index",
    // "link",
];
//以下固定
$api['server'] = [
    "appVersion" => $appVersion,
    "servertime" => date("Y-m-d H:i:s"),
];
$api['mopconInfo'] = [
    "sessionDate" => [
        "start" => "2016-10-29",
        "end"   => "2016-10-30"
    ],
    "slogan" => "堅持，在濁水溪以南",
    "location" => "高雄國際會議中心",
    "map" => [
        'lat' => 22.626417,
        'lng' => 120.285722,
        'zoom' => 16,
    ],
    
];
$api['data'] = [];
if (! isset($_GET['page'])) {
    $api['server']['lastUpdate'] = date("Y-m-d H:i:s",getLastUpdateTime());
    foreach ($api['menu'] as $page) {
        $api['data'][$page] = apiMappingData($page);
    }
} elseif (! in_array($_GET['page'], $api['menu'])) { //異常
    $api['isSucc'] = false;
    $api['errMessage'] = "選項不存在";
    getJson($api);
    //exit...
} else {
    $api['server']['lastUpdate'] = date("Y-m-d H:i:s",getLastUpdateTime($_GET['page']));
    $api['data'] = apiMappingData($_GET['page']);
}
getJson($api);
//exit...