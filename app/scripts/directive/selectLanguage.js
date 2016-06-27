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

				if (lng == 'es') {
					$('.fewer_greater_show').addClass('none');
				}else{
					$('.fewer_greater_show').removeClass('none');
				}

				// Change language
				elem.find('.lng').removeClass('ativo');
				$(this).addClass('ativo');
			});
		}
	}
}); 