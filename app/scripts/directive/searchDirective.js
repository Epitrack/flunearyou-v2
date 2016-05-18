/*
*	Search Directive
*/

'use strict';

app.directive('search', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('keyup', function() {
				var search = $(this).val(),
				count = 0;

				$('#questions ul li').each(function() {
					if ( $(this).text().search(new RegExp(search, 'i')) < 0 ) {
						$(this).fadeOut();
					} else {
						$(this).show();
						count++;
					}
				});

				var resultsItem = count;
				$('#count-results').text(resultsItem);
			});
		}
	}
}); 