<html lang="zh-TW" class="">
  <head>
      <meta charset="utf-8">
    <title>MOPCON 2013 | 交通資訊</title>
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="MOPCON 2013 | 交通資訊" property="og:title">
    <meta content="http://mopcon.org/2013/map.php" property="og:url">
    <meta content="MOPCON 2013 | 今年度擴大於高雄國際會議中心(ICCK)舉辦，歡迎大家蒞臨指教" property="og:description">
    <meta content="http://mopcon.org/img/snapshot.jpg" property="og:image">
    <meta content="website" property="og:type">
    <meta content="MOPCON 2013 | 交通資訊" property="og:site_name">
    <meta name="description" content="行動科技年會 | MOPCON 2013 | Mobile / Open / Platform Conference">
    <link type="text/css" href="css/bootstrap/css/bootstrap.min.css" media="screen" rel="stylesheet">
    <link type="text/css" href="css/all.css" media="screen" rel="stylesheet">
    <link rel="SHORTCUT ICON" href="favicon.ico">
    <!-- <style type="text/css"> @font-face { font-family: "ct10"; src: url(http://ds3.justfont.com/file/get/100001_0_30668557695/ct10_d3e8f81b2827.jpeg?type=eot); src: local(" "),      url(http://ds3.justfont.com/file/get/100001_0_30668557695/ct10_d3e8f81b2827.jpeg?type=ttf) format("truetype"),      url(http://ds3.justfont.com/file/get/100001_0_30668557695/ct10_d3e8f81b2827.jpeg?type=woff) format("woff");} #ct10 { font-family: "ct10"; }.ct10 { font-family: "ct10"; }</style> -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script src="css/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript">
$(function () {
    $("a[rel='external']").click(function () {
        this.target = "_blank";
    });
});
</script>
<script src="http://use.edgefonts.net/source-code-pro.js"></script>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/all.js#xfbml=1&appId=191415824227657";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
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
  <style>
  #all {
      padding: 10px;
  }
  #map-canvas {
      height: 350px;
      margin-bottom:1em;
  }
  #map-canvas img {
      max-width: none; // hack, fix infoWindow glich when using bootstrap and google map together
  }
  </style>
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
  <script>
    function initialize()
    {
      var icck = new google.maps.LatLng(22.626197, 120.285605);

      var mapOptions = {
              zoom: 15,
              center: icck,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
      var ele = document.getElementById('map-canvas');
      var map = new google.maps.Map(ele, mapOptions);

      new google.maps.Marker({
          'position': icck,
          'map': map,
          'title': "高雄國際會議中心"
      });
/*
      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent("高雄國際會議中心");
      infoWindow.setPosition(icck);
      infoWindow.open(map);
*/


    }

    google.maps.event.addDomListener(window, 'load', initialize);

  </script>


  </head>
  <body data-twttr-rendered="true" data-spy="scroll" data-target=".subnav" data-offset="50">
      <div class="navbar">
    <div class="navbar-inner">
            <div class="navbar-container">
        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <a id="main_logo" class="brand" href="./"><img src="img/logo.png"/></a>
        <div class="nav-collapse">
          <ul class="nav">
            <li class=""><a href="session.php">議程</a></li>
            <li class=""><a href="sponsor.php">贊助</a></li>
            <!-- <li class=""><a href="cfp.php">議程投稿</a></li> -->
            <li class=""><a href="speakers.php">講者</a></li>
            <li class="active"><a href="map.php">交通</a></li>
            <li class=""><a href="irc.php">IRC</a></li>
            <li class=""><a href="apps.php">Apps</a></li>
            <li class=""><a href="social.php">社群</a></li>
            <li class="dropdown ">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">其他 <b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu">
                <!-- <li class=""><a href="register.php">報名</a></li> -->
                <!-- <li class="divider"></li> -->
                <!-- <li class=""><a href="cfs.php">贊助活動</a></li> -->
                <li class=""><a href="contact.php">聯絡我們</a></li>
                <li class="divider"></li>
                <li class=""><a href="../history.html">歷年活動</a></li>
              </ul>
            </li>
          </ul>
          <ul id="language" class="nav pull-right">
            <li class="divider-vertical"></li>
            <li><a href="index_en.php">English</a></li>
          </ul>
        </div><!-- /.nav-collapse -->
      </div>
    </div><!-- /navbar-inner -->
    <div id="functionSeprate"></div>
  </div><!-- /navbar -->
    <div class="container" id="all">
      <h1>會場交通資訊</h1>

      <div class="row">
      <div id="map-canvas" class="span12"></div>
      </div>

      <div class="row">
        <div class="span4">
        <div class="well">
          <p><h3>會場：</h3>
          <h4>高雄國際會議中心ICCK</h4>
          <p>高雄市鹽埕區中正四路274號
          <p><a href="http://www.icck.com.tw/location.asp">ICCK 官方網頁說明</a>
        </div>
        </div>

        <div class="span4">
          <h3>高鐵/火車/捷運</h3>
          <ol>
            <li>左營高鐵站/高雄火車站搭捷運紅線</li>
            <li>至捷運美麗島站換乘橘線往西
            <li>捷運鹽埕埔站下車，二號出口步行約 250 公尺可至會場</li>
          </ol>
        </div>

        <div class="span4">
          <h3>公車</h3>
          <p>歷史博物館0南(單邊停靠)、0北(單邊停靠)、11、25、33、56、60、76、77、82、建國幹線、91、214、219、248
        </div>

      </div>

    </div>
    <div class="copyright">Copyright &copy; 2013 Mobile Open Platform Conference. Designed by KSDG, CocoaHeads Kaohsiung, MOSUT, KIMU, KaLUG</div>
<script type="text/javascript">
$(".agenda-title").each(function(){
  var $this = $(this);
  $this.find('a').on('click', function(e){e.stopPropagation();}); // 避免連結點擊被 toggle 吃掉
  var $parent = $this.parent();
  $this.toggle(function(e){
    $parent.addClass("on").removeClass("off");
    e.preventDefault();
  },function(e){
    $parent.addClass("off").removeClass("on");
    e.preventDefault();
  });
});
</script>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-34651129-1']);
_gaq.push(['_setDomainName', 'mopcon.org']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
//ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
  </body>
</html>
