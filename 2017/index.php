<?php
include __DIR__ . '/src/init.php';

$map = [
        'lat' => 22.626417,
        'lng' => 120.285722,
        'zoom' => 16,
];

$lang = getLang();
$pageid = 'index';
$params = [
    'pageid' => $pageid,
    'filemtime' => getLastUpdateTime($pageid),
    'map' => $map,
    'index' => getIndex(),
//    'speakers' => getAllSpeakers($order = 'random'),
    'sponsors' => getSponsors(),
];
if (isset($_GET['api'])) {
	getJson($params);
}

render('index.twig', $params);
