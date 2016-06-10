/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('mapCtrl', ['$scope', '$rootScope','$http', '$urlBase', 'session', 
	function($scope, $rootScope, $http, $urlBase, session){
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");
	session.then( function() {
	
	var MAP = {
		
		_markers : [],

		LatLng : function(lat, lng){
			return new google.maps.LatLng(lat, lng);
		},

		initMap : function(lat, lon, zoom, cdc, zip){
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
	        var geocoder = new google.maps.Geocoder();
	        map.mapTypes.set('map_style', styledMap);
	        map.setMapTypeId('map_style');
	       	
	        if (!cdc) {
	        	MAP.getMarkers(map);
	        }else{
	        	$http.get('scripts/json/cdc.json').success(function(data, status){
	        		
	        		var stylers  = data
	        		map.data.loadGeoJson('scripts/json/states.geo.json');
	        		map.data.setStyle(function(feature){
		           	 	var name = feature.getProperty('name'), color;

		           	 	if (stylers[name]) color = stylers[name].fill.color;

		           	 	return {
		           	 		fillColor: color,
		                	fillOpacity: 0.75,
		                	strokeWeight: 1
		           	 	}
		           	});
	        	});
	        };

	    
	        if (zip) MAP.mapForZipCpde(map, geocoder);

			return map;
		},

		mapForZipCpde : function(map, geocoder){
			var zipCode = sessionStorage.getItem('zip');

			geocoder.geocode( { 'address': zipCode}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					map.setZoom(9);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						icon     : 'images/marker.png',
						zIndex   : 9999
					});
				} else {
					alert('Geocode was not successful for the following reason: ' + status);
				}
			});
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
							image = 'images/icon-azul.png';
						break;

						case '3' : 
							image = 'images/icon-amarelo.png';
						break;

						case '5' : 
							image = 'images/icon-vermelho.png';
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
                        m.zIndex = 9998;
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

			if(window.innerHeight > window.innerWidth){
			    MAP.initMap("40.0902", "-98.7129", 3, true, false);
			}else{
				MAP.initMap("40.0902", "-110.7129", 4, true, false);
			}

			$('.info-cdc').removeClass('none');
		},

		showMarkers : function(){
			var arrMarkers = MAP._markers;
			for( var i = 0; i < arrMarkers.length;  ++i ) {
				arrMarkers[i].setVisible(true);
			};	

			if(window.innerHeight > window.innerWidth){
			    MAP.initMap("40.0902", "-98.7129", 3, false);
			}else{
				MAP.initMap("40.0902", "-110.7129", 4, false);
			}

			$('.info-cdc').addClass('none');
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

	
	/*
	*	If zipCode
	*/ 
	var zipCode = sessionStorage.getItem('zip')
	
	if (zipCode){
		var zip = true;
	}else{
		var zip = false;
	}
 	
 	// Init Maps
    if(window.innerHeight > window.innerWidth){
	    MAP.initMap("40.0902", "-98.7129", 3, false, zip);
	}else{
		MAP.initMap("40.0902", "-110.7129", 4, false, zip);
	}



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
	
	/*
	*	Flu News
	*/
	$http.get($urlBase+'/flu-news.json?FNY_Site=flunearyou.org').success(function(data, status){
		$scope.news = data;
	});

	$scope.showReadMore = true;

	/*
	*	Tabs about
	*/ 
	$scope.tab1 = true;
	$scope.tab2 = false;
	$scope.changeTab = function(tab){
		if(tab == 'tab1'){
			$scope.tab1 = true;
			$scope.tab2 = false;
		}else{
			$scope.tab1 = false;
			$scope.tab2 = true;
		};
	};
	});
}]);