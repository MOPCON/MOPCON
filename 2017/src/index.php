<?php
function getIndex()
{
    $lang_zh = json_decode(file_get_contents("locales/zh_TW.json"), true);
    $lang_en = json_decode(file_get_contents("locales/en.json"), true);
    $main = [
        'zh' => $lang_zh,
        'en' => $lang_en,
    ];
    return getI18n($main);
}

function getStream()
{
    $google_data = json_decode(file_get_contents(__DIR__ . '/../api/stream.json'), true);
    $google_data = $google_data['feed']['entry'];
    $lang_zh = [];
    $lang_en = [];
    foreach ($google_data as $item) {
        $lang_zh[$item['gsx$id']['$t']] = [
            'id'            => $item['gsx$id']['$t'],
            'room'          => $item['gsx$room']['$t'],
            'title'         => $item['gsx$title']['$t'],
            'link'          => $item['gsx$link']['$t'],
            'onair'         => $item['gsx$onair']['$t']
        ];

        $lang_en[$item['gsx$room']['$t']] = [
            'id'            => $item['gsx$id']['$t'],
            'room'          => $item['gsx$room']['$t'],
            'title'         => $item['gsx$en-title']['$t'],
            'link'          => $item['gsx$link']['$t'],
            'onair'         => $item['gsx$onair']['$t']
        ];
    }
    $main = [
        'zh' => $lang_zh,
        'en' => $lang_en
    ];
    return getI18n($main);
}
