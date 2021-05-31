
$(document).ready(function() {
   $(window).resize(function() {
    if($(document).width()>767){
      $( ".detail,.detail_outbox" ).hide();
    }
     

  });
$('.talker h2 a').on('click',function(e){
  
  e.preventDefault();

  if($(document).width()>767){
    // columns.next().remove('.detail');
    var columns = $(this).parents('.row');
    var content = $(this).parent().parent().find('.detail').html();
    var _site = $(this).parent().parent().parent().attr('class');
  	var _siteClass = 'arrow-'+_site;
    var details = '<div class="detail detail_outbox '+_siteClass+'">'+content+'<div>';
    columns.next('.detail_outbox').remove();
    columns.after(details);
  }
  if($(document).width()<767){

    $(this).parent().parent().find('.detail').fadeToggle();
  }
});
$('.talker .jq-close').on('click',function(e){
	e.preventDefault();
	$(this).parent().fadeOut(300);
});

$('.talk-☴').on('click','.detail_outbox .jq-close',function(e){
	e.preventDefault();
	$(this).parent().fadeOut(300,function(){$(this.remove())});
});

$('.group-list a').on('click',function(e){
	e.preventDefault();
	var _offset = $('.group-list a').index(this);
	$('html,body').animate({ scrollTop: $('.group-content').eq(_offset).offset().top -50 }, 800);
	//console.log($('.group-content').eq(3).offset())
})

$(window).scroll(function () {
     
    if ($(window).scrollTop() > $('.page-title').offset().top) {
        $('.scroll-top-btn').addClass('active');
    } else {
        $('.scroll-top-btn').removeClass('active');
    }

});	
$(".scroll-top-btn").on('click',function () {
        $("html,body").animate({
            scrollTop: 0
        }, 900);
        return false;
    });


	var t
	$('.showmenu').on('click',  function(e){
		e.preventDefault();
		t = document.body.scrollTop;
		$('body').toggleClass('menu-show')
		$('.perspective').addClass('delay')
		$('.absolute').css('top',- t)
	})
	$('.block').click(function(e){
		e.preventDefault();
		$('body').removeClass('menu-show')
		setTimeout(
		function() {
			$('.perspective').removeClass('delay')
			$('.absolute').css('top', 0)
			$('body').scrollTop(t)
		}, 500)
	})

	


})


	// $('.showmenu').on('click',function(){
	// 	$('body').toggleClass('open');
	// });
// 	$('.area-1,.area-2,.area-3,.area-all').on('click',function(){
// 		$('body').toggleClass('open-session');
// 		var title = $(this).find('h2').text();
// 		var author = $(this).find('h3').text();
// 		$('.talker-view h2').text(title);
// 		$('.talker-view p').text(author);
// 	})
//           $('.close').on('click',function(){
//                $('body').removeClass('open-session');
//           })


// ---super cool menu
