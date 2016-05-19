/*
*
*/

'use strict';

app.directive('uiCalender', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				var k = scope.week_of;
				if (scope.user.current_survey) {
		            if (scope.user.first_survey) {
		                var min = k;
		            } else {
		                var min = k.setDate(k.getDate() + 7);
		            }
		            var max = new Date();
		            var date_default = new Date();
		        } else {
		            var min = k;
		            var max = scope.week_end;
		            var date_default = new Date(min);
		        }
		        scope.date_default = date_default;

		        console.log('min', min);
		        console.log('max', max);
		        console.log('date_default', date_default);

		        $('#date_input').pickadate({
		            min: min,
		            max: max,
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