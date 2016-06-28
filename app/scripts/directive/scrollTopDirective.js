/*
*
*/

// 'use strict';

app.directive('scrollTo', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
			
				$('html, body').animate({
					'scrollTop' : 1340
				}, 'slow');

				return false;
			});
		}
	}
}); 