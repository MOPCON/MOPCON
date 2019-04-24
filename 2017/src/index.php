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
