<?php
include __DIR__ . "/../../vendor/autoload.php";
include __DIR__ . '/index.php';
include __DIR__ . '/location.php';
include __DIR__ . '/sponsor.php';
include __DIR__ . '/speaker.php';
include __DIR__ . '/schedule.php';
include __DIR__ . '/hackmd.php';
include __DIR__ . '/schedule_unconf.php';
include __DIR__ . '/community.php';

//////////////////////////////////////////////////////////////////////////////

function getSpeakerById($id)
{
    static $speakers = null;
    if (null === $speakers) {
        $speakers = getAllSpeakers();
    }
    return isset($speakers[$id]) ? $speakers[$id] : null;
}

function getHackmdById($id)
{
    static $hackmdList = null;
    if (null === $hackmdList) {
        $hackmdList = getAllHackmd();
    }
    return isset($hackmdList[$id]) ? $hackmdList[$id] : null;
}

function getCommunityById($id)
{
    static $communities = null;
    if (null === $communities) {
        $communities = getAllCommunities();
    }
    return isset($communities[$id]) ? $communities[$id] : null;
}

/**
 * 合併議程跟講者
 *
 * 若 speaker 異常，找不到講者 ID 
 * 會強制蓋掉 name, info 為 晚點告訴你 :P , image 為 ../mopcon2016.png
 * 
 * @return array
 */
function getScheduleMergeSpeaker()
{
    $schedules = getAllSchedule();  
    foreach ($schedules as $days => $list)
    {
        for ($temp=0; $temp < count($list); $temp++)
        {
            if (isset($list[$temp]['speaker']) && $list[$temp]['speaker'] != '')
            {
                $tempSpeakerInfo = getSpeakerById($list[$temp]['speaker']);
                $tempHackmdInfo = getHackmdById($list[$temp]['speaker']);
                if ($tempSpeakerInfo === null)
                {
                    $tempSpeakerInfo = [];
                    $tempSpeakerInfo['name'] = '晚點告訴你 :P';
                    $tempSpeakerInfo['info'] = '晚點告訴你 :P';
                    $tempSpeakerInfo['image'] = '../mopcon2016.png';
                }
                if ($tempHackmdInfo === null)
                {
                    $tempHackmdInfo = [];
                }
                $schedules[$days][$temp] = array_merge($list[$temp], $tempSpeakerInfo,$tempHackmdInfo);
            }
        }
    }
    
    return $schedules;
}
/**
 * 取得最後修改時間，部分頁面會自動計算相關頁面最大值
 * @param  string $page 頁面代號，空值代表全部取最大值
 * @return time
 */
function getLastUpdateTime($page = '')
{
    $list = [
        "index"                 => filemtime(__DIR__  . '/../index.php'),
        "cfp"                   => filemtime(__DIR__  . '/../cfp.php'),
        // "location"      => filemtime(__DIR__  . '/../location.php'),
        "schedule"              => filemtime(__DIR__  . '/../schedule.php'),
        "schedule_unconf"       => filemtime(__DIR__  . '/../schedule_unconf.php'),
        "speaker"               => filemtime(__DIR__  . '/../speaker.php'),
        "sponsor"               => filemtime(__DIR__  . '/../sponsor.php'),
        "community"             => filemtime(__DIR__  . '/../community.php'),
        "src.schedule"          => filemtime(__DIR__  . '/schedule.php'),
        "src.hackmd"            => filemtime(__DIR__  . '/hackmd.php'),
        "src.schedule_unconf"   => filemtime(__DIR__  . '/schedule_unconf.php'),
        "src.speaker"           => filemtime(__DIR__  . '/speaker.php'),
        "src.sponsor"           => filemtime(__DIR__  . '/sponsor.php'),
        "src.community"         => filemtime(__DIR__  . '/community.php'),
        "src.index"             => filemtime(__DIR__  . '/index.php'),
        "src.init"              => filemtime(__DIR__  . '/init.php'),
        "api.speaker"           => filemtime(__DIR__  . '/../api/speakers.json'),
        "api.sponsor"           => filemtime(__DIR__  . '/../api/sponsors.json'),
        "api.community"         => filemtime(__DIR__  . '/../api/community.json'),
        "api.index"             => filemtime(__DIR__  . '/../api/index.php'),
        "api.schedule"          => filemtime(__DIR__  . '/../api/schedules.json'),
        "api.hackmd"            => filemtime(__DIR__  . '/../api/hackmd.json'),
        "api.schedule_unconf"   => filemtime(__DIR__  . '/../api/schedules_unconf.json'),
        "css.all"               => filemtime(__DIR__  . '/../stylesheets/all.css'),
        "css.web-fonts"         => filemtime(__DIR__  . '/../stylesheets/web-fonts.css'),
        "js.all"                => filemtime(__DIR__  . '/../javascripts/all/all.js'),
    ];
    if ($page == '') {
        return max($list);
    } elseif (! isset($list[$page])) {
        return time(); //當異常就回傳當下時間
    } elseif ($page == "schedule") {
        return max(
            $list['schedule'], 
            $list['src.init'], 
            $list['src.schedule'], 
            $list['src.speaker'],
            $list['src.hackmd'],
            $list['api.schedule'],
            $list['api.speaker'],
            $list['api.hackmd']
        );
    } elseif ($page == "index") {
        return max(
            $list['index'], 
            $list['src.sponsor'], 
            $list['src.speaker'],
            $list['api.index'], 
            $list['api.sponsor'], 
            $list['api.speaker']
        );
    } else {
        $max = $list[$page];
        if(isset($list["src." . $page])) {
            $max = max(
                $max, 
                $list["src." . $page]
            );
        }
        if(isset($list["api." . $page])) {
            $max = max(
                $max, 
                $list["api." . $page]
            );
        }
        return $max;
    }
    
}
/**
 * 取得api對應的資料
 * @param  string $page 頁面代號
 * @return array  無資料會回傳 null
 */
function apiMappingData($page)
{
    switch ($page) {
        case 'schedule':
            return getScheduleMergeSpeaker();
        case 'schedule_unconf':
            return getScheduleUnconf();
        case 'sponsor':
            return getAllSponsors();
        case 'speaker':
            return getAllSpeakers();
        case 'location':
            return getLocation();
        case 'index':
            return getIndex();
        case 'community':
            return getAllCommunities();
        default:
            return null;
    }
}
/**
 * 印出 json，自動 exit
 * @param array $params 
 * @return void
 */
function getJson($params)
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($params);
    exit;
}
//////////////////////////////////////////////////////////////////////////////
function getLang()
{
    static $lang = null;
    if ($lang) {
        return $lang;
    }

    $supported_langs = [
        'zh',
        'en'
    ];

    if (isset($_GET['lang']) && in_array($_GET['lang'], $supported_langs)) {
        $lang = $_GET['lang'];
    } elseif(isset($_COOKIE['lang'])) {
        $lang = $_COOKIE['lang'];
    } else {
        if (isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) {
            $browser_lang = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 2);
        } else {
            $browser_lang = 'zh';
        }
        $lang = in_array($browser_lang, $supported_langs) ? $browser_lang : 'en';
    }
    setcookie('lang', $lang);

    return $lang;
}

function getI18n($msg_data)
{
    if (!is_array($msg_data) || 0 === count($msg_data)) {
        return [];
    }

    $lang = getLang();

    if (isset($msg_data[$lang])) {
        return $msg_data[$lang];
    }
    if (isset($msg_data['en'])) {
        return $msg_data['en'];
    }
    return reset($msg_data); // return first group
}

function getWebList($notSelf = true)
{
    $nowDir = trim(pathinfo($_SERVER['PHP_SELF'],PATHINFO_DIRNAME),"/");
    $webList = [];
    //檢查
    for ($i = date("Y"); $i >= 2012; $i--) {
        if ($notSelf && $i == $nowDir ) continue;
        if ( file_exists ( __DIR__.'/../../'.$i)) {
            $webList[] = $i;    
        }
    }
    return $webList;
}

function render($template_name, $params)
{
    $main_msg = [
        'zh' => [
            'sitetitle' => '行動科技年會 | MOPCON 2016 | Mobile / Open / Platform Conference',
            'ogtitle' => '行動科技年會 | MOPCON 2016 | Mobile / Open / Platform Conference',
            'ogsitename' => '行動科技年會 | MOPCON 2016 | Mobile / Open / Platform Conference',
            'ogdesc' => '濁水溪以南最強大行動科技研討會，2016強勢回歸',
            'nav' => [
                'cfp' => '徵稿',
                'community' => '主辦社群',
                // 'location' => '地圖',
                'previous' => '歷年 MOPCON',
                'speaker' => '講者',
                'schedule' => '議程',
                'sponsor' => '贊助',
                'schedule_unconf' => '交流場次',
                // 'hackpad' => '2016 hackpad',
                // 'chatroom' => '聊天室',
                // 'chatroom_gitter' => '網頁版（Gitter）',
                // 'chatroom_irc' => 'IRC: #mopcon @ freenode',
                'hackfoldr' => '共筆記錄',
                'gitter' => 'gitter 聊天室',

            ],
        ],
        'en' => [
            'sitetitle' => 'MOPCON 2016 | Mobile / Open / Platform Conference',
            'ogtitle' => 'MOPCON 2016 | Mobile / Open / Platform Conference',
            'ogsitename' => 'MOPCON 2016 | Mobile / Open / Platform Conference',
            'ogdesc' => 'Your favoeite conference for mobile technology in southern Taiwan is now back in 2016',
            'nav' => [
                // 'cfp' => 'Call for Presentation',
                // 'community' => 'Community',
                // 'location' => 'Location', 
                'previous' => 'Previous Events',
                // 'speaker' => 'Speakers',
                'schedule' => 'Session',
                'schedule_unconf' => 'Unconf',
                // 'sponsor' => 'Sponsors',
                // 'hackpad' => '2016 hackpad',
                // 'chatroom' => 'Chat Room',
                // 'chatroom_gitter' => 'Gitter',
                // 'chatroom_irc' => 'IRC: #mopcon @ freenode',
                'hackfoldr' => 'hackfoldr',
                'gitter' => 'gitter',
            ],
        ],
    ];
    $main = getI18n($main_msg);
    $main['pagetitle'] = (isset($main['nav'][$params['pageid']]))?$main['nav'][$params['pageid']]:"";

    $params = array_replace_recursive(
        [
            'main' => $main,
            'website'=>$_SERVER['HTTP_HOST'],
            'webList'=>getWebList(),
            'lang' => getLang(),
            'og_image' => 'mopcon2016.png',
            'og_url' => '',
            'version' => [
                'allCss' => getLastUpdateTime('css.all'),
                'allJs' => getLastUpdateTime('js.all'),
                'webFontsCss' => getLastUpdateTime('css.web-fonts'),
            ],
        ],
        $params
    );
    $loader = new \Twig_Loader_Filesystem(__DIR__ . '/../twig');
    $twig = new \Twig_Environment($loader);
    $twig->addExtension(new Jralph\Twig\Markdown\Extension(new Jralph\Twig\Markdown\Parsedown\ParsedownExtraMarkdown));
    echo $twig->render($template_name, $params);
}
