/*
*
*/

'use strict';

app.directive('openHealph', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				$(this).toggleClass('heightAuto');
				if($(this).hasClass('heightAuto')){
					$(this).find('span').css('transform', 'rotate(-45deg)')
				}else{
					$(this).find('span').css('transform', 'rotate(0deg)')
				};
			});
		}
	}
}); 