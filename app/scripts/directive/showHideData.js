/*
*
*/

'use strict';

app.directive('showHideData', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				$(this).toggleClass('ativo');
				if($(this).hasClass('ativo')){
					$(this).find('button').text('HIDE DATA');
					$('#databox-mobile').animate({
						'height' : '410px'
					},'slow')
				}else{
					$(this).find('button').text('SHOW DATA');
					$('#databox-mobile').animate({
						'height' : '0'
					},'slow')
				}
			});
		}
	}
}); 