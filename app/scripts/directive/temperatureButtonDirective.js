/*
*	Temperature Directive
*/

'use strict';

app.directive('temperatureButton', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			

		    $('#text-slider').html('less than ' + 99.9 + ' ºF');

		    function decimalAdjust(type, value, exp) {
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

		    var getValeu;
			elem.on('click', function(){
				if ($(this).hasClass('plus')) {
					getValeu = Number($('#text-slider').attr('data-value'))
					if (getValeu < 101) {
						var n = getValeu + 0.1;
					    $('#text-slider').attr('data-value', decimalAdjust('round', n, -1));
					    
					    if (n == 101) {
			                $('#text-slider').html('greater than' + decimalAdjust('round', n, -1) + ' ºF');
			                $("#fever_f").val(101);
			            }else {
			                $('#text-slider').html(decimalAdjust('round', n, -1) + ' ºF');
			                $("#fever_f").val(decimalAdjust('round', n, -1));
			            }	
					}
				}else{
					getValeu = Number($('#text-slider').attr('data-value'));
					if (getValeu > 99.9) {
						var n = getValeu - 0.1;
					    $('#text-slider').attr('data-value', decimalAdjust('round', n, -1));

					    if (n == 99.9) {
			                $('#text-slider').html('less than ' + 99.9 + ' ºF');
			                $("#fever_f").val(99.9);
			            }else {
			                $('#text-slider').html(decimalAdjust('round', n, -1) + ' ºF');
			                $("#fever_f").val(decimalAdjust('round', n, -1));
			            }
					}
				}
			});
		}
	}
}); 