<html lang="zh-TW" class="">
  <head>
      <meta charset="utf-8">
    <title>MOPCON 2013 | Map to MOPCON</title>
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="MOPCON 2013 | Map to MOPCON" property="og:title">
    <meta content="http://mopcon.org/2013/map_en.php" property="og:url">
    <meta content="MOPCON 2013 | MOPCON 2013 will be held at ICCK(International Convention Center Kaohsiung)" property="og:description">
    <meta content="http://mopcon.org/img/snapshot.jpg" property="og:image">
    <meta content="website" property="og:type">
    <meta content="MOPCON 2013 | Map to MOPCON" property="og:site_name">
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
          'title': "International Convention Center Kaohsiung"
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
        <a id="main_logo" class="brand" href="index_en.php"><img src="img/logo.png"/></a>
        <div class="nav-collapse">
          <ul class="nav">
            <!-- <li class=""><a href="session.php">議程</a></li> -->
            <li class=""><a href="sponsor_en.php">Sponsors</a></li>
            <li class=""><a href="cfp_en.php">Call for Papers</a></li>
            <li class="active"><a href="map_en.php">Location</a></li>
          </ul>
          <ul id="language" class="nav pull-right">
            <li class="divider-vertical"></li>
            <li><a href="./index.php">中文版</a></li>
          </ul>
        </div><!-- /.nav-collapse -->
      </div>
    </div><!-- /navbar-inner -->
    <div id="functionSeprate"></div>
  </div><!-- /navbar -->
    <div class="container" id="all">
      <h1>Where to MOPCON</h1>

      <div class="row">
      <div id="map-canvas" class="span12"></div>
      </div>

      <div class="row">
        <div class="span4">
        <div class="well">
          <p><h3>Venue</h3>
          <h4>International Convention Center Kaohsiung (ICCK)</h4>
          <p>No.274, Zhongzheng 4th Rd., Yancheng Dist., Kaohsiung City 803
          <p><a href="http://www.icck.com.tw/location.asp">ICCK's instruction.</a>
        </div>
        </div>

        <div class="span4">
          <h3>THSR/Train/MRT</h3>
          <ol>
            <li>Take MRT red line at (THSR)Zuoying Station or (Train)Kaohsiung Station.</li>
            <li>Transit to orange line at Formosa Boulevard Station.</li>
            <li>Get off at Yanchengpu station. The venue is 250 meters away from exit No. 2</li>
          </ol>
        </div>

        <div class="span4">
          <h3>Bus</h3>
          <p>Kaohsiung History Museum: 0S(one way only), 0N(one wy only), 11, 25, 33, 56, 60, 76, 77, 82, 建國幹線, 91, 214, 219, 248
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
