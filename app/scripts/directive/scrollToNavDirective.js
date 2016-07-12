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
					        scrollTop: $(".wrapper-flu-news").offset().top - 110
					    }, 2000);
					}else{
						$('html, body').animate({
					        scrollTop: $(".about-tabs").offset().top - 150
					    }, 2000);
					}
					
					return false;
				}else{
					return true;
				}
			});
		}
	}
}); 