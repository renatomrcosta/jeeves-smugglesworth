//Ultima HTML5 Landing Page v2.0
//Copyright 2014 8Guild.com
//Color Switcher

$(document).ready(function(e) {
	
	var toggle = $('.color-switcher .toggle');
	var colorTile = $('.color-switcher a'); 
	toggle.click(function(){
		$(this).parent().toggleClass('open');
	});
	
	colorTile.click(function(e){
		colorTile.removeClass('current');
		$(this).addClass('current');
		var color = $(this).attr('data-color');
		$('head link.color-scheme').attr('href', 'css/colors/color-' + color + '.css');
		e.preventDefault();
	});
	
});
	
