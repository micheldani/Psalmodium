$(document).ready( function() {
	
	$('.index').on(down, function(){
		var indexNum = $(this).attr('title');
		pageNumber = parseInt(indexNum);
		$('#b-block').animate({opacity:0}, 80, function () {
			$('#b-block').css('visibility', 'hidden');
			});
		$('.drop-index').animate({opacity:0}, 80, function () {
			$('.drop-index').css('visibility', 'hidden');
			loadPages(pageNumber);
            $('#thepage').animate({opacity:1}, 120);
		});
		$('#b-index').animate({opacity:1}, 80);
        resetOnOff();
	});
	
});