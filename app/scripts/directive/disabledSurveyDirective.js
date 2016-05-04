/*
*	Disabled Survey Directive
*/

'use strict';

app.directive('disabledSurvey', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				var disabledSymptoms = scope.disabledSymptoms;
				if (disabledSymptoms) {
					$('.disabled').find('input').attr('disabled', true).attr('checked', false);
				}else{
					$('.disabled').find('input').attr('disabled', false);
				}
			});
		}
	}
}); 