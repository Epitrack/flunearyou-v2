/*
*	AutoComlete Directive
*/

'use strict';

app.directive('autoComplete', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			setTimeout(function(){
				elem.chosen({});
			},1000)
		}
	}
}); 