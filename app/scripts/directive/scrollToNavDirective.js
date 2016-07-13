/*
*
*/

'use strict';

app.directive('scrollToNav', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				var url = window.location.href,
					i   = url.indexOf('/#/');
				
				if (url.slice(i) == '/#/'){
					var menu = $(this).attr('data-menu');

					if (menu == 'news') {
						$('html, body').animate({
					        scrollTop: 530
					    }, 2000);
					}else{
						$('html, body').animate({
					        scrollTop: 1347
					    }, 2000);
					}
					
					return false;
				}
			});
		}
	}
}); 