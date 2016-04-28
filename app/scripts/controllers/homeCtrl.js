/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('homeCtrl', ['$scope', '$rootScope','$http', '$urlBase', function($scope, $rootScope, $http, $urlBase){
	/*
	*	Clear the localStorage showFluMap for restart the flu-map
	*/ 
	localStorage.removeItem('showFluMap');

	/*
	*	Whach the localStorage  
	*/ 
	$scope.watchShowFluMap = function() {
		$rootScope.showFluMap = localStorage.getItem('showFluMap');
	};
	$rootScope.$on("SHOWFLUMAP", $scope.watchShowFluMap);

	/*
	*	Flu map customer
	*/ 
	$scope.map = { 
		center: { 
			latitude: 40.0902, 
			longitude: -110.7129 
		}, 
		zoom: 4,
		options : {
			styles : [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.01"},{"visibility":"off"},{"hue":"#ff8f00"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f2f2f2"},{"weight":"2.32"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffce00"},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d4ebf5"},{"visibility":"on"}]}],
			streetViewControl: false,
			panControl: false,
			overviewMapControl: false,
			mapTypeControl: false
		}
	};

	/*
	*	Get marker for flu map
	*/ 
	$http.get($urlBase+'/map/markers').success(function(data, status, headers, config){
		// $scope.markers = data;
		// console.log(data)
	});

	$scope.teste = function(){
		$scope.showWin = true;
	};


	$scope.markers = [
		{
			"coords": {
				"id": "1",
				"latitude": "45.5200",
				"longitude": "-122.6819"
			},
			showWindow: false,
			"options": {
				"chick": "0",
		        "dengue": "0",
		        "flu": "0",
		        "lepto": "0",
		        icon: "3",
		        city :"Gladwin(48624)",
		        contained_by: "225",
		        none:2
			}
		},
		{
			"coords": {
				"id": "2",
				"latitude": "40.7903",
				"longitude": "-73.9597"
			},
			"infos" : {
				"chick": "0",
		        "dengue": "0",
		        "flu": "0",
		        "lepto": "0",
		        icon: "3",
		        city :"Gladwin(48624)",
		        contained_by: "225",
		        none:2
			}
		},
		{		
			"coords": {
				"id": "3",
				"latitude": "44.076893",
				"longitude": "-84.480263"
			},
			"infos" : {
				"chick": "0",
		        "dengue": "0",
		        "flu": "0",
		        "lepto": "0",
		        icon: "3",
		        city :"Gladwin(48624)",
		        contained_by: "225",
		        none:2
			}
		},
		{		
			"coords": {
				"id": "4",
				"latitude": "40.807194",
				"longitude": "-73.173309"
			},
			"infos" : {
				"chick": "0",
		        "dengue": "0",
		        "flu": "0",
		        "lepto": "0",
		        icon: "3",
		        city :"Gladwin(48624)",
		        contained_by: "225",
		        none:2
			}
		},
		{		
			"coords": {
				"id": "5",
				"latitude": "40.437080",
				"longitude": "-86.103920"
			},
			"infos" : {
				"chick": "0",
		        "dengue": "0",
		        "flu": "0",
		        "lepto": "0",
		        icon: "3",
		        city :"Gladwin(48624)",
		        contained_by: "225",
		        none:2
			}
		}
	];

}]);