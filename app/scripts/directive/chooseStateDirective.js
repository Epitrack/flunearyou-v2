/*
*	Directive: Choose State and then show data
*/

'use strict';

app.directive('chooseStateDirective', ['$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout){
	return {
		restrict : 'A',
		link : function(scope, elem){
			elem.on('change', function(){
				$window.location.href = '#/map';

				var stateSelected     =  elem.find(':selected'),
					surveys           =  Number(stateSelected.attr('data-surveys')),
					nosymptoms        =  Number(stateSelected.attr('data-nosymptoms')),
					nosymptomspercent =  Number(stateSelected.attr('data-nosymptomspercent')),
					symptoms          =  Number(stateSelected.attr('data-symptoms')),
					symptomspercent   =  Number(stateSelected.attr('data-symptomspercent')),
					flulike           =  Number(stateSelected.attr('data-flulike')),
					flulikepercent    =  Number(stateSelected.attr('data-flulikepercent')),
					latitude          =  Number(stateSelected.attr('data-lat')),
					longitude		  =  Number(stateSelected.attr('data-lon')),
					value             =  stateSelected.attr('value'),
					color             =  stateSelected.attr('data-color'),
					image 			  =  stateSelected.attr('value').replace(' ', '-');

				var objDataSurvey = {
					'surveys' : surveys,
					'nosymptoms' : nosymptoms,
					'nosymptomspercent' : nosymptomspercent,
					'symptoms' : symptoms,
					'symptomspercent' : symptomspercent,
					'flulike' : flulike,
					'flulikepercent' : flulikepercent
				};

				var centerState = {
					'latitude'  : latitude,
					'longitude' : longitude
				};

				var centerDefault = {
					latitude  : 40.0902, 
					longitude : -110.7129 
				}

				var colorImage = {
					color : color,
					image : image
				};

				

				var zoomMap   = (value == 'United States') ? zoomMap = 4 : zoomMap = 6;
				var	centerMap = (value == 'United States') ? centerMap = centerDefault : centerMap = centerState;

				// Open Flu-map
				localStorage.setItem('showFluMap', 'true');
        		$rootScope.$emit("SHOWFLUMAP");

				// Update dataBox
				sessionStorage.setItem('objDataSurvey', JSON.stringify(objDataSurvey));
				sessionStorage.setItem('centerMap', JSON.stringify(centerMap));
				sessionStorage.setItem('zoomMap', zoomMap);
				$timeout(function(){
					$('.wrapper-databox-image').css({
						'background' : ''+colorImage.color+' url(images/states/'+colorImage.image+'.png) no-repeat center center' 
					});
					$rootScope.$emit('updateInfoDataBox');	
				},500)
				
			});
		}
	};
}]);