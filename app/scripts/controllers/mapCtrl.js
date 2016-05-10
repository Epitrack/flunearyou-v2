/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('mapCtrl', ['$scope', '$rootScope','$http', '$urlBase', function($scope, $rootScope, $http, $urlBase){
	
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");
	
	var MAP = {
		
		_markers : [],

		LatLng : function(lat, lng){
			return new google.maps.LatLng(lat, lng);
		},

		initMap : function(lat, lon, zoom, cdc){
			var style     = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"weight":"0.01"},{"visibility":"off"},{"hue":"#ff8f00"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f2f2f2"},{"weight":"2.32"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffce00"},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d4ebf5"},{"visibility":"on"}]}]
	        var lat_lng   = MAP.LatLng(lat, lon);
	        var styledMap = new google.maps.StyledMapType(style, {name: "Styled Map"});
	        var mapCustom = {
	            center: lat_lng,
	            zoom: zoom,
	            mapTypeControl: false,
	            panControl: false,
	            streetViewControl: false,
	            zoomControl: true,
	            scrollwheel: false,
	            zoomControlOptions: {
	                style: google.maps.ZoomControlStyle.SMALL
	            }
	        };

	        // Map
	        var map = new google.maps.Map(document.getElementById('map'), mapCustom);
	        map.mapTypes.set('map_style', styledMap);
	        map.setMapTypeId('map_style');
	       	
	        if (!cdc) {
	        	MAP.getMarkers(map);
	        }else{
	        	$http.get('scripts/json/cdc.json').success(function(data, status){
	        		map.data.loadGeoJson('scripts/json/states.geo.json');
	        		var stylers  = data
	        		$http.get('scripts/json/states.geo.json').success(function(data, status){
	        			
	        			var states = data.features,
	        				state = [];

	        			for (var i = 0; i < states.length; i++){
	        				var s     = states[i];
	        				state.push(s.properties.name);
	        			}
	        				
	        			map.data.setStyle(MAP.getStyleCDCOverlays(stylers, state));
	        		});
	        		
	        	});
	        };
	      	
			return map;
		},

		getStyleCDCOverlays : function(stylers, state){
            var color = stylers.Alabama.fill.color;
            
            return {
                fillColor: color,
                fillOpacity: 0.85,
                strokeWeight: 1
            };
		},

		getMarkers : function(map){
			$http.get($urlBase+'/map/markers').success(function(data, status, headers, config){
				var markers      = data,
					arrayMarkers = []; 
				
				for (var i = 0; i < markers.length; i++) {
					
					var marker     = markers[i],
						markerIcon = marker.icon,
						image      = '';
						
						
					// Type icon
					switch(markerIcon){
						case '1' :
							image = '../images/icon-azul.svg';
						break;

						case '3' : 
							image = '../images/icon-amarelo.svg';
						break;

						case '5' : 
							image = '../images/icon-vermelho.svg';
						break;
					}

					var m = {
						id          : i,
						image       : image,
			            latitude    : marker.latitude,
			            longitude   : marker.longitude,
			            zIndex      : null,
			            msg         : '<div class="infowindow"><header><h3>'+marker.city+'</h3></header><div class="infos"><p class="qtdSym">'+marker.flu+'</p><p>FLU<br/> SYMPTOMS</p></div><div class="infos border"><p class="qtdSym">'+marker.symptoms+'</p><p>ANY<br/> SYMPTOMS</p></div><div class="infos"><p class="qtdSym">'+marker.none+'</p><p>NO<br/> SYMPTOMS</p></div></div>'
			        };

			        // Set zIndex of the marker
			        if (marker.icon == 5) {
                        m.zIndex = 9999;
                    } else if (marker.icon == 3) {
                        m.zIndex = 700;
                    }else{
                    	m.zIndex = 100;
                    }

			        arrayMarkers.push(m);
				};
				MAP.putMarkersInMap(map, arrayMarkers);
			});

		},

		putMarkersInMap : function(map, arrayMarkers){
			 for (var i = 0; i < arrayMarkers.length; i++) {
                var marker    = arrayMarkers[i];
                var point     = new google.maps.LatLng(marker.latitude, marker.longitude);
                var putMarker = new google.maps.Marker({
					position : point,
					map      : map,
					icon     : marker.image,
					zIndex   : marker.zIndex
				});

				MAP._markers.push(putMarker);
				MAP.openInfoWin(putMarker, marker.msg);
				
            }
		},

		hideMarkers : function(){
			var arrMarkers = MAP._markers;
			for( var i = 0; i < arrMarkers.length;  ++i ) {
				arrMarkers[i].setVisible(false);
			};

			MAP.initMap("40.0902", "-110.7129", 4, true)	
		},

		showMarkers : function(){
			var arrMarkers = MAP._markers;
			for( var i = 0; i < arrMarkers.length;  ++i ) {
				arrMarkers[i].setVisible(true);
			};	

			MAP.initMap("40.0902", "-110.7129", 4, false)
		},

		openInfoWin : function(marker, msg){
			google.maps.event.addListener(marker, 'click', function(){
				var infowindow = new google.maps.InfoWindow({
					content: msg
				});
				infowindow.open(marker.get('map'), marker);

			});
		}
	};

    MAP.initMap("40.0902", "-110.7129", 4, false);



	/*
	*	Get states databox
	*/ 
	$http.get($urlBase+'/states').success(function(data, status, headers, config){
		$scope.stateList = data; // State list

		// Initial position dataBox
		$scope.infoDataBox = {
			'surveys':           data[0].data.total_surveys,
			'nosymptoms':        data[0].data.no_symptoms,
			'nosymptomspercent': data[0].data.none_percentage,
			'symptoms':          data[0].data.symptoms,
			'symptomspercent':   data[0].data.symptoms_percentage,
			'flulike':           data[0].data.ili,
			'flulikepercent':    data[0].data.ili_percentage
		};
	});


	/*
	*	Get info's data box
	*/
	$scope.updateInfoDataBox = function(){

		var center  = JSON.parse(sessionStorage.getItem('centerMap')),
			zoom    = Number(sessionStorage.getItem('zoomMap')),
			lat     = center.latitude,
			lon     = center.longitude;

		$scope.infoDataBox = JSON.parse(sessionStorage.getItem('objDataSurvey'));
		MAP.initMap(lat, lon, zoom);
		$scope.$apply(); // Update $scope
	};

	$rootScope.$on('updateInfoDataBox', $scope.updateInfoDataBox);

	
	/*
	*	Hide/Show markers
	*/ 
	$scope.hideMarkers = function(){ MAP.hideMarkers(); }
	$scope.showMarkers = function(){ MAP.showMarkers(); }
	

}]);