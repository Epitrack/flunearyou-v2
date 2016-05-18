/*
*
*/

'use strict';

app.directive('accordion', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				var height = $(this).find('p').height();	
				$(this).toggleClass('open');
				if($(this).hasClass('open')){
					$(this).animate({
						'height' : height + 140
					},200);
					$(this).find('span').css('transform', 'rotate(45deg)')
				}else{
					$(this).animate({
						'height' : '80px'
					},200);
					$(this).find('span').css('transform', 'rotate(0deg)')
				};
			});
		}
	}
}); 