//Ultima HTML5 Landing Page v2.3
//Copyright 2014 8Guild.com
//All scripts for Ultima Coming Soon Page


/*Document Ready*/
$(document).ready(function(e) {
	
	/*Scroll Up*/
	$('.scroll-up').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 1000, 'easeInOutQuart');
    return false;
	});
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 500) {
			$('#scroll-top').addClass('visible');
		} else {
			$('#scroll-top').removeClass('visible');
		}
	});
	
	/*Adding Placeholder Support in Older Browsers*/
	$('input, textarea').placeholder();
	
	/*Tooltips*/
	$('.tooltipped').tooltip();
	
	/*Countdown*/
	$('.countdown').countdown('2015/05/15', function(event) {
    $(this).html(event.strftime('%D:%H:%M:%S'));
  });
	
	/*Subscriptions Form Validation*/
	$('.subscribe-form').validate();
	
	//Enable Touch / swipe events for carousel 
	$(".carousel-inner").swipe( {
		//Generic swipe handler for all directions
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			$(this).parent().carousel('prev'); 
		},
		swipeLeft: function() {
			$(this).parent().carousel('next'); 
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
	});
		
});/*/Document ready*/


