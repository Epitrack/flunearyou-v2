/*
*
*/

'use strict';

app.directive('uiCalender', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){

		        $('#date_input').pickadate({
		            min: 'Mon May 02 2016 00:00:00 GMT-0300 (BRT)',
		            max: 'Sun May 08 2016 00:00:00 GMT-0300 (BRT)',
		            format: 'dddd, mmmm d yyyy'
		        });

		        var picker = $('#date_input').pickadate('picker');
		        if (picker != null) {
		            picker.set('select', 'Mon May 02 2016 00:00:00 GMT-0300 (BRT)');
		        };

			});
		}
	}
}); 