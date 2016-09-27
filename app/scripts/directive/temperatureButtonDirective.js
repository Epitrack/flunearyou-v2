/*
*	Temperature Directive
*/

'use strict';

app.directive('temperatureButton', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			

		    var decimalAdjust = function(type, value, exp) {
				// If the exp is undefined or zero...
				if (typeof exp === 'undefined' || +exp === 0) {
					return Math[type](value);
				}
				value = +value;
				exp = +exp;
				// If the value is not a number or the exp is not an integer...
				if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
					return NaN;
				}
				// Shift
				value = value.toString().split('e');
				value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
				// Shift back
				value = value.toString().split('e');
				return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
			}

			var fever = decimalAdjust('round', 99.9, -1);
			$('#text-slider').html('less than ' + 99.9 + ' ºF');

		    elem.on('click', function(){
		    	

		    	console.log(fever);

		    	// if ($(this).hasClass('minus')) {
		    	// 	if (fever >= 100) {
		    	// 		fever = fever - 0.1
		    	// 		if (fever == 99.9) {
			    //             $('#text-slider').html('less than ' + 99.9 + ' ºF');
			    //             $("#fever_f").val(99.9);
			    //         } else {
			    //             $('#text-slider').html(fever + ' ºF');
			    //             $("#fever_f").val(fever);
			    //         }
		    	// 	}
		    	// }

		    	// if ($(this).hasClass('plus')) {
		    	// 	if (fever < 101) {
		    	// 		fever = fever + 0.1
		    	// 		if (fever == 101) {
			    //             $('#text-slider').html('greater than' + 101 + ' ºF');
			    //             $("#fever_f").val(101);
			    //         } else {
			    //             $('#text-slider').html(fever + ' ºF');
			    //             $("#fever_f").val(fever);
			    //         }
		    	// 	}
		    	// }	
		    });
		}
	}
}); 