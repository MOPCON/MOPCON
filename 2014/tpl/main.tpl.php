<?php

	if (!isset($this->og_desc)) {
		$this->og_desc = "Mobile Open Platform Conference (MOPCON) 行動科技年會是全台第一個針對移動應用開發的技術研討會，希望大家共同來參與。";
	}

?><!doctype html>
<html lang="zh-tw">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/all.css">
	<link rel="stylesheet" href="css/icomoon.css">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
	<title><?= htmlspecialchars($this->title) ?> | 行動科技年會 | MOPCON 2014 | Mobile / Open / Platform Conference</title>
	<meta content="<?= htmlspecialchars($this->title) ?> | 行動科技年會 | MOPCON 2014 | Mobile / Open / Platform Conference" property="og:title">
	<meta content="http://mopcon.org/2014" property="og:url">
	<meta content="<?= htmlspecialchars($this->og_desc) ?>" property="og:description">
	<meta content="http://mopcon.org/img/snapshot-2014-v2.png" property="og:image">
	<meta content="website" property="og:type">
	<meta content="行動科技年會 | MOPCON 2014 | Mobile / Open / Platform Conference" property="og:site_name">
</head>
<body>

<menu class="main-menu">
	<div class="container">
	<a href="/" class="logo desktop-only"></a>
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
	<article class="content <?= htmlspecialchars($this->mainClass)?>">
		<div class="page-title">
			<h1><?= htmlspecialchars($this->title) ?></h1>
		</div>
	<?=$this->content ?>
	</article>
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
<?php
if(isset($this->footer_script)){
    echo "<script>\n" . $this->footer_script . "\n</script>\n";
}?>
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
