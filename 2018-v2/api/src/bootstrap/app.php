<?php
require __DIR__ . '/../../../../vendor/autoload.php';

// 從 hostname 判斷目前運行環境
$version = 'testing';
if ($_SERVER['HTTP_HOST'] == 'dev.mopcon.org') {
    $version = 'development';
} elseif ($_SERVER['HTTP_HOST'] == 'mopcon.org') {
    $version = 'production';
}

$config = [
    'settings' => [
        'displayErrorDetails' => true,
        'version' => $version,
        'cache' => [
            'path' => __DIR__ . '/../storage/cache',
        ],
    ],
];

$app = new Slim\App($config);
$container = $app->getContainer();

$container['ApiController'] = function ($container) {
    return new MopConApi2018\App\Http\ApiController($container);
};

$container['isProduction'] = function () use ($config) {
    return $config['settings']['version'] == 'production';
};

$container['cache'] = function () use ($config) {
    return $cache = new \Wruczek\PhpFileCache\PhpFileCache(
        $config['settings']['cache']['path']
    );
};

$app->get('/2018/api/__info__', function () {
    try {
        $ch = curl_init();
        // 484 該更新了？ 4...
        curl_setopt($ch, CURLOPT_URL, "https://hackmd.io/s/ByvLG0oWX");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TCP_KEEPALIVE, 1);
        curl_setopt($ch, CURLOPT_TCP_KEEPIDLE, 2);
        $data = curl_exec($ch);
        if (curl_errno($ch)) {
            throw new Exception(curl_error($ch));
        }
        curl_close($ch);
        echo $data;
    } catch (Exception $e) {
        echo '>_____________________<';
    }
});

$app->get('/2018/api/devQrcode/{id}', function ($request, $response, $params) {

    if ($_SERVER['PHP_AUTH_USER'] != $params['id']) {
        unset($_SERVER['PHP_AUTH_USER']);
    }

    if (!isset($_SERVER['PHP_AUTH_USER'])) {
        header('WWW-Authenticate: Basic realm="My Realm"');
        header('HTTP/1.0 401 Unauthorized');
        echo 'Text to send if user hits Cancel button';
        exit;
    } else {
        header("Pragma: no-cache");
        header("Expires: Sat, 01 Jan 2000 00:00:00 GMT");
        echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
        echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as your password.</p>";
    }

    $booths = [];
    for ($i = 1; $i < 11; $i++) {
        $booths[$i] = [
            'token' => "mopconbooth_$i",
            'reward' => $i * 5,
        ];
    }

    $booth = $booths[$params['id']];

    $result = [
        // token 是讓 server 辨認攤位，取得對應的任務獎勵並發送
        'id' => $params['id'],
        'token' => $booth['token'],
    ];

    $result['qr'] = 'http://chart.apis.google.com/chart?cht=qr&chl=' . urlencode(json_encode($result)) . '&chs=150x150';

    echo "<img src='$result[qr]'>";
    echo "<script>(function() {
        setTimeout(function() {
            location.reload()
        }, 30000);
    })();</script>";
});

// 用 group 可以從 global 分離出來
$app->group('/2018/api', function () {
    $this->any('/{routes:.*}', 'ApiController');
})->add(new MopConApi2018\App\Http\ApiMiddleware($container));

$app->run();
