<?
    $title = isset($title) ? "MOPCON 2013 | ".$title : "行動科技年會 | MOPCON 2013 | Mobile / Open / Platform Conference";
    $og_descr = isset($og_descr) ? "MOPCON 2013 | ".$og_descr : "Mobile Open Platform Conference (MOPCON) 行動科技年會 是全台第一個針對移動式裝置的技術研討會，希望大家共同來參與。";
    $page_file = isset($page_file) ? $page_file : "";
?>
    <meta charset="utf-8">
    <title><?=$title ?></title>
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="<?=$title ?>" property="og:title">
    <meta content="http://mopcon.org<?=$page_file ?>" property="og:url">
    <meta content="<?=$og_descr ?>" property="og:description">
    <meta content="http://mopcon.org/img/snapshot.jpg" property="og:image">
    <meta content="website" property="og:type">
    <meta content="<?=$title ?>" property="og:site_name">
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
