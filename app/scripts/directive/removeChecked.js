/*
*	Disabled Survey Directive
*/

'use strict';

app.directive('removeChecked', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				if($(this).hasClass('any-symptoms-below')){
					$('.item-symptoms').attr('checked', false)	
				}else{
					setTimeout(function(){
						$('.item-symptoms').attr('checked', false)
					},2500)
				}
			});
		}
	}
}); 