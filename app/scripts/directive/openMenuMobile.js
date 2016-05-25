/*
*
*/

'use strict';

app.directive('openMenuMobile', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				$('#btn-menu-mobile').toggleClass('ativo');
				if($('#btn-menu-mobile').hasClass('ativo')){
					$('.nav-mobile').animate({
						'height' : '360px'
					},'slow')
				}else{
					$('.nav-mobile').animate({
						'height' : '0'
					},'slow')
				}
			});
		}
	}
}); 