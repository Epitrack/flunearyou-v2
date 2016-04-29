/*
*	Directive: Choose State and then show data
*/

'use strict';

app.directive('chooseStateDirective', function($rootScope){
	return {
		restrict : 'A',
		link : function(scope, elem){
			elem.on('change', function(){
				var stateSelected     =  elem.find(':selected'),
					surveys           =  Number(stateSelected.attr('data-surveys')),
					nosymptoms        =  Number(stateSelected.attr('data-nosymptoms')),
					nosymptomspercent =  Number(stateSelected.attr('data-nosymptomspercent')),
					symptoms          =  Number(stateSelected.attr('data-symptoms')),
					symptomspercent   =  Number(stateSelected.attr('data-symptomspercent')),
					flulike           =  Number(stateSelected.attr('data-flulike')),
					flulikepercent    =  Number(stateSelected.attr('data-flulikepercent'));

				var objDataSurvey = {
					'surveys' : surveys,
					'nosymptoms' : nosymptoms,
					'nosymptomspercent' : nosymptomspercent,
					'symptoms' : symptoms,
					'symptomspercent' : symptomspercent,
					'flulike' : flulike,
					'flulikepercent' : flulikepercent
				};

				sessionStorage.setItem('objDataSurvey', JSON.stringify(objDataSurvey));
				$rootScope.$emit('updateInfoDataBox');
			});
		}
	};
});