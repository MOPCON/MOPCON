<?php
namespace MopCon2018\Utils;

class Base
{
    protected static $default_lang = 'zh';
    protected static $supported_langs = ['zh', 'en'];

    public static function test()
    {
        return 'Hello, World!';
    }

    public static function getConfig($file_path = __DIR__ . '/../../../config.php')
    {
        return require $file_path;
    }

    public static function getBaseUri()
    {
        return isset(static::getConfig()['base_uri']) ? static::getConfig()['base_uri'] : 'https://mopcon.org';
    }

    public static function render($template_name, $params)
    {
        $main_msg = [
            'zh' => [
                'sitetitle' => '行動科技年會 2018 | Mobile / Open / Platform Conference',
                'ogtitle' => '行動科技年會 2018 | Mobile / Open / Platform Conference',
                'ogsitename' => '行動科技年會 2018 | Mobile / Open / Platform Conference',
                'ogdesc' => '濁水溪以南最強大行動科技研討會，2018強勢回歸',
                'nav' => [
                    // 'cfp' => '徵稿',
                    'community' => '主辦社群',
                    'ticket' => '售票',
                    // 'location' => '地圖',
                    // 'previous' => '歷年 MOPCON',
                    'member' => '志工組織',
                    'speaker' => '講者',
                    'schedule' => '議程',
                    'sponsor' => '贊助',
                    'schedule_unconf' => '交流場次',
                    // 'hackpad' => '2018 hackpad',
                    // 'chatroom' => '聊天室',
                    // 'chatroom_gitter' => '網頁版（Gitter）',
                    // 'chatroom_irc' => 'IRC: #mopcon @ freenode',
                    'hackfoldr' => '共筆記錄',
                    'gitter' => 'Gitter 聊天室',
                    'ticket' => '購票資訊',
                    'apps' => 'Apps',
                    'blog' => '部落格',
                    'stalls' => '社團攤位申請',
                    'code_of_conduct' => 'MOPCON 行動準則',
                    'album' => '歷年相簿'

                ],
                'his_mopcon' => '歷年 MOPCON',
            ],
            'en' => [
                'sitetitle' => 'MOPCON 2018 | Mobile / Open / Platform Conference',
                'ogtitle' => 'MOPCON 2018 | Mobile / Open / Platform Conference',
                'ogsitename' => 'MOPCON 2018 | Mobile / Open / Platform Conference',
                'ogdesc' => 'Your favoeite conference for mobile technology in southern Taiwan is now back in 2018',
                'nav' => [
                    // 'cfp' => 'Call for Presentation',
                    'community' => 'Community',
                    'ticket' => 'Ticket',
                    // 'location' => 'Location',
                    // 'previous' => 'Previous Events',
                    'member' => 'Member',
                    'speaker' => 'Speakers',
                    'schedule' => 'Schedule',
                    'schedule_unconf' => 'Unconf',
                    'sponsor' => 'Sponsors',
                    // 'hackpad' => '2016 hackpad',
                    // 'chatroom' => 'Chat Room',
                    // 'chatroom_gitter' => 'Gitter',
                    // 'chatroom_irc' => 'IRC: #mopcon @ freenode',
                    'hackfoldr' => 'HackMD',
                    'gitter' => 'Gitter',
                    'ticket' => 'Ticket',
                    'apps' => 'Apps',
                    'blog' => 'Blog',
                    'stalls' => 'Stalls',
                    'code_of_conduct' => 'MOPCON Code of Conduct',
                    'album' => 'Album'
                ],
                'his_mopcon' => 'Past MOPCON',
            ],
        ];
        $main = self::getI18n($main_msg);
        $main['pagetitle'] = (isset($main['nav'][$params['pageid']])) ? $main['nav'][$params['pageid']] : $main['sitetitle'];
        $webParams = str_replace(['&lang=zh', '&lang=en'], ['', ''], isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : "");
        @$params = array_replace_recursive(
            [
                'main' => $main,
                'website' => $_SERVER['HTTP_HOST'],
                // 'webList' => getWebList(),
                'webParams' => $webParams,
                'lang' => self::getLang(),
                'og_title' => (isset($main['nav'][$params['pageid']])) ? $main['nav'][$params['pageid']] : '行動科技年會 2018 | Mobile / Open / Platform Conference',
                'og_description' => (isset($main['nav'][$params['ogdesc']])) ? $main['nav'][$params['ogdesc']] : '濁水溪以南最強大行動科技研討會，2018 11/03-11/04!',
                'og_image' => (isset($main['nav'][$params['og_image']])) ? $main['nav'][$params['og_image']] : 'https://mopcon.org/2018/assets/images/mopcon2018_large.jpg',
                'og_url' => (isset($main['nav'][$params['og_url']])) ? $main['nav'][$params['og_url']] : '',
                'version' => [
                    // 'allCss' => getLastUpdateTime('css.all'),
                    // 'allJs' => getLastUpdateTime('js.all'),
                    // 'webFontsCss' => getLastUpdateTime('css.web-fonts'),
                ],
                'from_app' => $from_app = isset($_GET['from_app']) ? (bool) $_GET['from_app'] : false,
            ],
            $params
        );
        $loader = new \Twig_Loader_Filesystem(__DIR__ . '/../../twig');
        $twig = new \Twig_Environment($loader);

        $twig->addGlobal('l10n', self::getL10n());
        $twig->addExtension(new \Jralph\Twig\Markdown\Extension(new \Jralph\Twig\Markdown\Parsedown\ParsedownExtraMarkdown));
        $baseUrl = new \Twig_SimpleFunction('baseUrl', function ($path) {
            return '/2018/' . $path;
        });
        $twig->addFunction($baseUrl);

        echo $twig->render($template_name, $params);
    }

    public static function getI18n($msg_data)
    {
        if (!is_array($msg_data) || 0 === count($msg_data)) {
            return [];
        }

        $lang = self::getLang();

        if (isset($msg_data[$lang])) {
            return $msg_data[$lang];
        }
        if (isset($msg_data['en'])) {
            return $msg_data['en'];
        }
        return reset($msg_data); // return first group
    }

    public static function getLang()
    {
        $lang = &$_GET['lang'];

        if (in_array($lang, self::$supported_langs)) {
            setcookie('lang', $lang);
            return $lang;
        }

        return isset($_COOKIE['lang']) ? $_COOKIE['lang'] : self::$default_lang;
    }

    public static function getL10n()
    {
        $fileList = glob(__DIR__ . '/../../locales/' . self::getLang() . '/*.json');
        $L10n = [];

        foreach ($fileList as $filePath) {
            $fileBasename = pathinfo($filePath, PATHINFO_FILENAME);
            $L10n[$fileBasename] = json_decode(file_get_contents($filePath));
        }

        return $L10n;
    }

    public static function getUriContents($uri)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $uri,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 3,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            throw new \Exception("cURL Error #:" . $err);
        }

        return $response;
    }

    public static function getRedisKey($type)
    {
        $prefix_key = self::getConfig()['redis']['key_prefix'];

        return $prefix_key . "_" . $type;
    }
}
