<?php
function getLocation()
{
	$main = [
    'zh' => [
        'icck' => '高雄國際會議中心',
        'list' => [
        	[
        		'header' => '高鐵 / 火車 / 捷運',
        		'desc' => '<ol><li>左營高鐵站 / 高雄火車站搭捷運紅線</li><li>至捷運美麗島站換乘橘線往西子灣方向</li><li>捷運鹽埕埔站下車，二號出口步行約 250 公尺可至會場</li></ol>'
        	],
        	[
        		'header' => '公車',
        		'desc' => '歷史博物館 0 南 (單邊停靠)、0 北 (單邊停靠)、11、25、33、56、60、76、77、82、建國幹線、91、214、219、248'
        	],
        ],
    ],
    'en' => [
        'icck' => 'International Convention Center Kaohsiung',
        'list' => [
        	[
        		'header' => 'High Speed Railway / Train / Metro',
        		'desc' => '<ol><li>Take Metro Red Line from THSR Zuoying Station or TRA Kaohsiung Station</li><li>Transfer to Orange Line at Formosa Boulevard Station</li><li>Get off at Yanchengpu Station, the ICCK is 250 meters away from Exit 2</li></ol>'
        	],
        	[
        		'header' => 'Bus',
        		'desc' => '0S (one way only), 0N (one way only), 11, 25, 33, 56, 60, 76, 77, 82, Jianguo Main Line, 91, 214, 219, 248'
        	],
        ],
    ],
	];
	return getI18n($main);
}