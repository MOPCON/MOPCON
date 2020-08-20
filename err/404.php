<?php
/* PHP Wrapper - 404 Not Found */

  if ( file_exists(dirname(__FILE__)."/../2012".$_SERVER['REQUEST_URI']) ) {
    // 2012 link exists
    header("HTTP/1.1 302 Redirect");
    header("Location: /2012".$_SERVER['REQUEST_URI']);
  } else {
    // 2012 link not exists
    // echo "URL: http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."<br>\n";
    // $fixer = "checksuexec ".escapeshellarg($_SERVER['DOCUMENT_ROOT'].$_SERVER['REQUEST_URI']);
    // echo `$fixer`;
  }

  $full_url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
?>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8">
    <title>行動科技年會 | MOPCON | Mobile / Open / Platform Conference</title>
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="行動科技年會 | MOPCON | Mobile / Open / Platform Conference" property="og:title">
    <meta content="http://mopcon.org" property="og:url">
    <meta content="Mobile Open Platform Conference (MOPCON) 行動科技年會 是全台第一個針對移動式裝置的技術研討會，希望大家共同來參與。" property="og:description">
    <meta content="http://mopcon.org/img/snapshot.jpg" property="og:image">
    <meta content="website" property="og:type">
    <meta content="行動科技年會 | MOPCON | Mobile / Open / Platform Conference" property="og:site_name">
    <meta name="description" content="行動科技年會 | MOPCON | Mobile / Open / Platform Conference">
    <link rel="SHORTCUT ICON" href="favicon.ico">
    <!-- <style type="text/css"> @font-face { font-family: "ct10"; src: url(http://ds3.justfont.com/file/get/100001_0_30668557695/ct10_d3e8f81b2827.jpeg?type=eot); src: local(" "),      url(http://ds3.justfont.com/file/get/100001_0_30668557695/ct10_d3e8f81b2827.jpeg?type=ttf) format("truetype"),      url(http://ds3.justfont.com/file/get/100001_0_30668557695/ct10_d3e8f81b2827.jpeg?type=woff) format("woff");} #ct10 { font-family: "ct10"; }.ct10 { font-family: "ct10"; }</style> -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <style>
    html, body{
      background-color:#e8e5cf;
      margin:0;
      padding:0;
      color:#555;
      line-height: 1.7em;
    }

    #top{
      background-color: white;
      padding:3em 1em;
      margin:0;
    }

    #bottom{
      padding:3em 1em;
      margin:0;
      text-align: center;
    }

    .wrapper{
      margin:0 auto;
      max-width: 70%;
    }

    #mascut{
      margin:0 auto;
      max-width: 100%;
    }

    .f{
      color: #999;
    }

    a:link, a:visited{
      color:#ff5500;
    }
    </style>
  </head>
  <body>
    <div id="top">
      <div class="wrapper">
        <img id="mascut" src="/err/mascot2.jpg">
      </div>
    </div>
    <div id="bottom">
      <div class="wrapper">
        <p>你想看的網頁在小女孩的第 404 個夢中，但<a href="/">首頁</a>就在眼前
        <p class="f">Mobile / Open / Platform Conference
      </div>
    </div>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-34651129-1']);
  _gaq.push(['_setDomainName', 'mopcon.org']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
  </body>
</html>
