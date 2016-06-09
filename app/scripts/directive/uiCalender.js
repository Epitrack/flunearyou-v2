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
		                var min = new Date(k.setDate(k.getDate() + 7));
		            }
		            var max = new Date();
		            var date_default = new Date();
		        } else {
		            var min = k;
		            var max = scope.week_end;
		            var date_default = new Date(min);
		        }
		        scope.date_default = date_default;

		        // Min Date
		        var minDay   = min.getDate(),
		        	minMonth = min.getMonth(),
		        	minYear  = min.getFullYear();

		        // Max Date
		        var maxDay   = max.getDate(),
		        	maxMonth = max.getMonth(),
		        	maxYear  = max.getFullYear();

		        if (minDay > maxDay) {
		        	var dateMonth = maxMonth + 1;
		        }else{
		        	var dateMonth = maxMonth;
		        }

		        // console.log(min);
		        // console.log(minYear, minMonth, minDay);
		        // console.log(max);
		       	// console.log(maxYear, dateMonth, maxDay);
		        $('#date_input').pickadate({
		        	min: new Date(minYear, minMonth, minDay),
  					max: new Date(maxYear, dateMonth, maxDay)
		        });

		     	// $('#date_input').pickadate();

		        var picker = $('#date_input').pickadate('picker');
		        if (picker != null) {
		            picker.set('select', 'Mon May 02 2016 00:00:00 GMT-0300 (BRT)');
		        };

			});
		}
	}
}); 