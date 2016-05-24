/*
*
*/

'use strict';

app.directive('editHousehold', [ '$rootScope', function($rootScope){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				var nick   = $(this).attr('data-nick'),
					gender = $(this).attr('data-gender'),
					niver  = $(this).attr('data-niver'),
					id     = $(this).attr('data-id');

				// Get month and year birthdate
				var index = niver.indexOf('/'),
					year  = niver.slice(index+1),
					month = niver.slice(0,index);
				
				var objHouseholdEdit = {
					id         : id,
					nickname   : nick,
					gender     : gender,
					niver      : niver
				};

				localStorage.setItem('objHouseholdEdit', JSON.stringify(objHouseholdEdit));
				$rootScope.$emit('updateHousehold');
			});
		}
	}
}]); 