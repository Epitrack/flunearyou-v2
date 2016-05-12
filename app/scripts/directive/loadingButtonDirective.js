/*
*	Loading Button
*/

'use strict';

app.directive('loadingButton', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				$(this).button('loading');
				setTimeout(function () { $(this).button('reset') }, 3000);
			});
		}
	}
}); 