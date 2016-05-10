/*
*	Remove option directive 
*/

'use strict';

app.directive('removeOption', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			setTimeout(function(){
				elem.find('option').eq(0).remove();	
			}, 1000)
		}
	}
}); 