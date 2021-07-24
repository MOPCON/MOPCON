//main.js
$(function(){
	$('.indexSlider').bxSlider({
		controls: false,
		auto: true
	});

	$('.weatherMarquee').bxSlider({
		mode: 'vertical',
		controls: false,
		pager: false,
		auto: true
	});

	$('.newsSlider').bxSlider({
		pager: false
	});

})