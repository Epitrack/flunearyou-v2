/*
*	Select language directive
*/

'use strict';

app.directive('selectLanguage', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				elem.toggleClass('opened');
			});

			elem.find('.lng').on('click', function(){
				var lng = $(this).attr('data-lng');
				
				// Change language
				elem.find('.lng').removeClass('ativo');
				$(this).addClass('ativo');
			});
		}
	}
}); 