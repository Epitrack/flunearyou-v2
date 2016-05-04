/*
*	Show Traveling
*/

'use strict';

app.directive('showTraveling', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.find('input').on('click', function(){
				var isChecked = $('#conditional input').is(':checked');
				if(isChecked){
					$('.fieldset-traveling').removeClass('none');
				}else{
					$('.fieldset-traveling').addClass('none');
				}
			});
		}
	}
}); 