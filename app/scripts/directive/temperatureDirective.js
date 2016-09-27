/*
*	Temperature Directive
*/

'use strict';

app.directive('temperature', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			var slide = function (event, ui) {

		        var l    = $(".ui-slider-handle").position().left,
		        	v    = ui.value,
		        	left = $(".ui-slider-handle").position().left;
		        	$("#thermometer_bg").width(l);

		        if (ui.value > 1) {
		            var n = (99.7 + ui.value / 10).toFixed(1);

		            if (n >= 101) {
		                $('#text-slider').html('greater than' + n + ' ºF');
		                $("#fever_f").val(101);
		                $('#thermometer_bg').addClass('hight');
		            } else if (n == 99.9) {
		                $('#text-slider').html('less than ' + 99.9 + ' ºF');
		                $("#fever_f").val(99.9);
		                $('#thermometer_bg').removeClass();
		            } else {
		                $('#text-slider').html(n + ' ºF');
		                $("#fever_f").val(n);
		                $('#thermometer_bg').removeClass();
		            }
		        } else {
		            $('#text-slider').html("");
		        }
			};

			elem.slider({
		        range: false,
		        min: 1,
		        max: 13,
		        step: 1,
		        animate: false,
		        value: 2,
		        slide: slide,
		        change: slide
		    });

		    $('#text-slider').html('less than ' + 99.9 + ' ºF');
		}
	}
}); 