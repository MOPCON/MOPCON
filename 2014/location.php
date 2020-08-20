<!doctype html>
<html lang="zh-tw">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/all.css">
	<link rel="stylesheet" href="css/icomoon.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
	<title>交通路線 | 行動科技年會 | MOPCON 2014 | Mobile / Open / Platform Conference</title>
	<meta content="交通路線 | 行動科技年會 | MOPCON 2014 | Mobile / Open / Platform Conference" property="og:title">
	<meta content="http://mopcon.org/2014" property="og:url">
	<meta content="Mobile Open Platform Conference (MOPCON) 行動科技年會是全台第一個針對移動應用開發的技術研討會，希望大家共同來參與。" property="og:description">
	<meta content="http://mopcon.org/img/snapshot-2014-v2.png" property="og:image">
	<meta content="website" property="og:type">
	<meta content="行動科技年會 | MOPCON 2014 | Mobile / Open / Platform Conference" property="og:site_name">
</head>
<body>

<menu class="main-menu">
	<div class="container">
	<a href="./" class="logo desktop-only"></a>
	<ul>
		<!-- <li class="menu-link"><a href="index.php"><span>首頁</span></a></li> -->
		<!-- li class="menu-link"><a href="news.php"><span>公告</span></a></li -->
		<!-- <li class="menu-link"><a href="cfp.php"><span>徵稿</span></a></li> -->
		<!-- <li class="menu-link"><a href="http://mopcon.kktix.cc/events/2014-registration"><span>報名</span></a></li> -->
		<li class="menu-link"><a href="session.php"><span>議程</span></a></li>
		<li class="menu-link"><a href="sponsor.php"><span>贊助</span></a></li>
		<li class="menu-link"><a href="speakers.php"><span>講者</span></a></li>
		<li class="menu-link"><a href="media.php"><span>媒體</span></a></li>
		<li class="menu-link"><a href="location.php"><span>交通</span></a></li>
		<li class="menu-link"><a href="https://kiwiirc.com/client/irc.freenode.net/mopcon" target="_blank"><span>聊天室</span></a></li>
		<!-- <li class="menu-link"><a href="#"><span>Apps</span></a></li> -->
		<li class="menu-link"><a href="community.php"><span>社群</span></a></li>
		<!--<li class="menu-link"><a href="/history.html"><span>歷年</span></a></li>-->
		<!-- <li class="menu-link"><a href="#"><span>其他</span></a></li> -->
	</ul>

	<div class="mobile-menu mobile-only">
        <a class="square-btn showmenu mobile-only">
        	<span></span>
        	<span></span>
        	<span></span>
        </a>
        <h1 class="mobile-only">MOPCON 2014</h1>
    </div>
	</div>
</menu>



<div class="main">
	<div class="container">
	<!-- layout start -->
	<article class="content location-➫">
		<div class="page-title">
			<h1>交通路線</h1>
		</div>
			<address>
			高雄國際會議中心ICCK - 高雄市鹽埕區中正四路274號
		</address>
		<div id="map-canvas" class="row"></div>

		<h2>交通方式</h2>
		<div class="row">
			<section class="transportation">
				<h3>高鐵/火車/捷運</h3>
				<ol>
				    <li>左營高鐵站/高雄火車站搭捷運紅線</li>
				    <li>至捷運美麗島站換乘橘線往西子灣方向</li>
				    <li>捷運鹽埕埔站下車，二號出口步行約 250 公尺可至會場</li>
				</ol>
			</section>
			
			<section class="transportation">
				<h3>公車</h3>
				<p>
					歷史博物館0南(單邊停靠)、0北(單邊停靠)、11、25、33、56、60、76、77、82、建國幹線、91、214、219、248
				</p>
			</section>
		</div>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
      <script>
        function initialize()
        {
          var styles = [
              {
                  featureType: "all",
                  stylers: [
                    { saturation: 0 },
                    {hue:"#FF6F4D"}
                  ]
                },{
                  featureType: "road.arterial",
                  elementType: "geometry",
                  stylers: [
                    { hue: "#00ffee" },
                    { saturation: 50 }
                  ]
                },{
                  featureType: "poi.business",
                  elementType: "labels",
                  stylers: [
                    { visibility: "off" }
                  ]
                }
               
            ];
          var icck = new google.maps.LatLng(22.626197, 120.285605);
          var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
          var mapOptions = {
                  zoom: 15,
                  center: icck,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                      }

              };
          var ele = document.getElementById('map-canvas');
          var map = new google.maps.Map(ele, mapOptions);
          map.mapTypes.set('map_style', styledMap);
            map.setMapTypeId('map_style');
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

      </script>	</article>
	<!-- layout end -->
	</div>
</div>
<footer class="footer">
	<div class="footer-content container">Copyright © 2014 Mobile Open Platform Conference. Designed by KSDG, CocoaHeads Kaohsiung, MOSUT, KIMU, KaLUG
	</div>
</footer>


<div href="#" class="scroll-top">
	<a href="#" class="square-btn scroll-top-btn">
		<span></span>
		<span></span>
		<span></span>
	</a>
</div>


<script src="js/jquery.min.js"></script>
<script src="js/all.js"></script>
<!--[if lt IE 9]>
    <script type="text/javascript" src="js/html5shiv.js"></script>
    <script type="text/javascript" src="js/respond.min.js"></script>
<![endif]-->
<script>
$(function(){
    $('.btn:contains("技術")').addClass('btn-pink');
    $('.btn:contains("營運")').addClass('btn-darkgreen');
})
</script>
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-34651129-1', 'auto');
ga('send', 'pageview');
</script>
</body>
</html>
