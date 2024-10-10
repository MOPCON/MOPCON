//main.js
$(function(){
	$('.banner-carousel').owlCarousel({
		loop: true,
		nav: false,
		autoplay: true,
		margin: 10,
		responsiveClass: true,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			},
			576: {
				items: 1,
			},
			768: {
				items: 1,
				dots: true,
			},
			1200: {
				items: 1,
				dots: true,
			}
		}
	})

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