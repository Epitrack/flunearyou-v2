/*
*	App
*/

'use strict';

var app = angular.module('flunearyouV2App', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-loading-bar', 'checklist-model', 'pascalprecht.translate', 'angular-growl', 'facebook', 'googleplus', 'ngStorage']);
//# sourceMappingURL=app.js.map

'use strict';

app.factory('session', ['$http', '$urlBase', '$routeParams', '$q', '$rootScope', '$window', '$translate', '$localStorage', function GetSession($http, $urlBase, $routeParams, $q, $rootScope, $window, $translate, $localStorage) {

    $localStorage.language = 'en';

    var defer = $q.defer();
    var tokenTracings = function tokenTracings(token) {
        $http.get($urlBase + '/user', { headers: { 'token': token } }).success(function (data, status) {
            var nickname = data.info.basic.nickname,
                userToken = data.info.basic.token,
                userEmail = data.info.basic.email,
                userLoggedObj = {
                'name': nickname,
                'email': userEmail,
                'token': userToken
            };

            localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
            $rootScope.$emit("IS_LOGGED");
            $window.location.href = '#/report?token=' + userToken;
        }).error(function (data, status) {
            console.log(status);
        });
        return true;
    };

    var languageTracings = function languageTracings(language) {
        $translate.use(language);
        $localStorage.language = language;
        return true;
    };

    var emailTracings = function emailTracings(track_id) {
        console.log('track_id', track_id);
        // $http.get($urlBase+'/email/tracking/view?track_id='+track_id, {headers: {'token': token}}).success(function(data, status){
        //     localStorage.setItem('track_id', track_id);
        // }).error(function(data, status){ console.log(status) });
        return true;
    };

    var campaignTracings = function campaignTracings(campaign) {
        console.log('campaign', campaign);
        localStorage.setItem('campaign', campaign);
        return true;
    };

    if ($routeParams.token) {
        tokenTracings($routeParams.token);
    }

    if ($routeParams.language) {
        languageTracings($routeParams.language);
    }

    if ($routeParams.track_id) {
        emailTracings($routeParams.track_id);
    }

    if ($routeParams.campaign) {
        campaignTracings($routeParams.campaign);
    }

    defer.resolve('done');
    return defer.promise;
}]);
//# sourceMappingURL=beforeExecute.js.map

'use strict';

app.config(['$routeProvider', function ($routeProvider) {

  var teste = {
    check: function check($window) {
      if (!localStorage.getItem('userLogged')) {
        $window.location.href = '#/';
      }
    }
  };

  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'homeCtrl'
  }).when('/home', {
    templateUrl: 'views/main.html',
    controller: 'homeCtrl'
  }).when('/landing', {
    templateUrl: 'views/landing.html',
    controller: 'landingCtrl'
  }).when('/about', {
    templateUrl: 'views/about.html',
    controller: 'homeCtrl'
  }).when('/map', {
    templateUrl: 'views/map.html',
    controller: 'mapCtrl'
  }).when('/flu-news', {
    templateUrl: 'views/flu-news.html',
    controller: 'fluNewsCtrl'
  }).when('/press', {
    templateUrl: 'views/press.html',
    controller: 'pressCtrl'
  }).when('/faq', {
    templateUrl: 'views/faq.html',
    controller: 'homeCtrl'
  }).when('/privacy', {
    templateUrl: 'views/privacy.html',
    controller: 'homeCtrl'
  }).when('/terms', {
    templateUrl: 'views/terms.html',
    controller: 'homeCtrl'
  }).when('/survey', {
    templateUrl: 'views/survey.html',
    controller: 'surveyCtrl',
    resolve: teste
  }).when('/report', {
    templateUrl: 'views/report.html',
    controller: 'reportCtrl',
    resolve: teste
  }).when('/reports', {
    templateUrl: 'views/reports.html',
    controller: 'healthReportCtrl',
    resolve: teste
  }).when('/settings', {
    templateUrl: 'views/settings.html',
    controller: 'settingCtrl',
    resolve: teste
  }).when('/unsubscribe', {
    templateUrl: 'views/unsubscribe.html',
    controller: 'unsubscribeCtrl',
    resolve: teste
  });
}]).animation('.reveal-animation', function () {
  return {
    enter: function enter(element, done) {
      element.css('display', 'none');
      element.fadeIn(600);
      return function () {
        element.stop();
      };
    },
    leave: function leave(element, done) {
      element.fadeOut(100);
      return function () {
        element.stop();
      };
    }
  };
});
//# sourceMappingURL=route.js.map

/*
*	 ngValue
*/

'use strict';

app.value('$urlBase', 'http://dev.flunearyou.org');
//# sourceMappingURL=value.js.map

/*
*	Loading bar
*/

'use strict';

app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
	cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
}]);
//# sourceMappingURL=loadingBarConfig.js.map

/*
*	Angular translate setup
*/
'use strict';

app.config(['$translateProvider', function ($translateProvider) {
	if (localStorage.getItem('translations_en') && localStorage.getItem('translations_es')) {

		$translateProvider.translations('en', JSON.parse(localStorage.getItem('translations_en'))).translations('es', JSON.parse(localStorage.getItem('translations_es'))).preferredLanguage('en').useSanitizeValueStrategy(null);
	} else {

		$.get('http://dev.flunearyou.org/translations').success(function (data, status) {
			localStorage.setItem('translations_en', JSON.stringify(data.translations.en));
			localStorage.setItem('translations_es', JSON.stringify(data.translations.es));

			$translateProvider.translations('en', JSON.stringify(data.translations.en)).translations('es', JSON.stringify(data.translations.es)).preferredLanguage('en').useSanitizeValueStrategy(null);

			window.location.reload();
		}).error(function (data, status) {
			console.log('Error in angularTranslateConfig.js');
			console.log(data, status);
		});
	}
}]);
//# sourceMappingURL=angularTranslateConfig.js.map

/*
*	Facebook Config
*/

'use strict';

app.config(['FacebookProvider', function (FacebookProvider) {
	var url = window.location.href;

	if (url.indexOf('localhost') != -1) {
		var FBid = '362068090500998';
	} else {
		// var FBid = '463215990541721';
		var FBid = '362068090500998';
	}
	FacebookProvider.init(FBid);
}]);
//# sourceMappingURL=facebookConfig.js.map

/*
*	Google Plus Config
*/

'use strict';

app.config(['GooglePlusProvider', function (GooglePlusProvider) {
       GooglePlusProvider.init({
              clientId: '736037612174-lpmdhpfcfane9p9cvqb9d6lkc5fc15mr.apps.googleusercontent.com',
              apiKey: 'Tpwrqg_jpW-qIZJPBDNeJu14',
              scopes: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
       });
}]);
//# sourceMappingURL=googlePlusConfig.js.map

'use strict';

/**
 * @ngdoc function
 * @name flunearyouV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flunearyouV2App
 // */

app.controller('MainCtrl', ['$scope', 'cdcstates', function ($scope, cdcstates) {}]);
//# sourceMappingURL=mainCtrl.js.map

/*
*	Controller: homeCtrl
*/

'use strict';

app.controller('mapCtrl', ['$scope', '$rootScope', '$http', '$urlBase', 'session', function ($scope, $rootScope, $http, $urlBase, session) {
	/*
 *	Init
 */
	localStorage.removeItem('landing');
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");
	session.then(function () {

		var MAP = {

			_markers: [],

			LatLng: function LatLng(lat, lng) {
				return new google.maps.LatLng(lat, lng);
			},

			initMap: function initMap(lat, lon, zoom, cdc, zip) {
				var style = [{ "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] }, { "featureType": "road", "elementType": "labels.text", "stylers": [{ "visibility": "on" }, { "color": "#000000" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "weight": "0.01" }, { "visibility": "off" }, { "hue": "#ff8f00" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#f2f2f2" }, { "weight": "2.32" }] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffce00" }, { "weight": "0.01" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#d4ebf5" }, { "visibility": "on" }] }];
				var lat_lng = MAP.LatLng(lat, lon);
				var styledMap = new google.maps.StyledMapType(style, { name: "Styled Map" });
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
				} else {
					$http.get('scripts/json/cdc.json').success(function (data, status) {

						var stylers = data;
						map.data.loadGeoJson('scripts/json/states.geo.json');
						map.data.setStyle(function (feature) {
							var name = feature.getProperty('name'),
							    color;

							if (stylers[name]) color = stylers[name].fill.color;

							return {
								fillColor: color,
								fillOpacity: 0.75,
								strokeWeight: 1
							};
						});
					});
				};

				if (zip) MAP.mapForZipCpde(map, geocoder);

				return map;
			},

			mapForZipCpde: function mapForZipCpde(map, geocoder) {
				var zipCode = sessionStorage.getItem('zip');

				geocoder.geocode({ 'address': zipCode }, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						map.setZoom(9);
						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location,
							icon: 'images/marker.png',
							zIndex: 9999
						});
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
			},

			getMarkers: function getMarkers(map) {
				$http.get($urlBase + '/map/markers').success(function (data, status, headers, config) {
					var markers = data,
					    arrayMarkers = [];

					for (var i = 0; i < markers.length; i++) {

						var marker = markers[i],
						    markerIcon = marker.icon,
						    image = '';

						// Type icon
						switch (markerIcon) {
							case '1':
								image = 'images/icon-azul.png';
								break;

							case '3':
								image = 'images/icon-amarelo.png';
								break;

							case '5':
								image = 'images/icon-vermelho.png';
								break;
						}

						var m = {
							id: i,
							image: image,
							latitude: marker.latitude,
							longitude: marker.longitude,
							zIndex: null,
							msg: '<div class="infowindow"><header><h3>' + marker.city + '</h3></header><div class="infos"><p class="qtdSym">' + marker.flu + '</p><p>FLU<br/> SYMPTOMS</p></div><div class="infos border"><p class="qtdSym">' + marker.symptoms + '</p><p>ANY<br/> SYMPTOMS</p></div><div class="infos"><p class="qtdSym">' + marker.none + '</p><p>NO<br/> SYMPTOMS</p></div></div>'
						};

						// Set zIndex of the marker
						if (marker.icon == 5) {
							m.zIndex = 9998;
						} else if (marker.icon == 3) {
							m.zIndex = 700;
						} else {
							m.zIndex = 100;
						}

						arrayMarkers.push(m);
					};
					MAP.putMarkersInMap(map, arrayMarkers);
				});
			},

			putMarkersInMap: function putMarkersInMap(map, arrayMarkers) {
				for (var i = 0; i < arrayMarkers.length; i++) {
					var marker = arrayMarkers[i];
					var point = new google.maps.LatLng(marker.latitude, marker.longitude);
					var putMarker = new google.maps.Marker({
						position: point,
						map: map,
						icon: marker.image,
						zIndex: marker.zIndex
					});

					MAP._markers.push(putMarker);
					MAP.openInfoWin(putMarker, marker.msg);
				}
			},

			hideMarkers: function hideMarkers() {
				var arrMarkers = MAP._markers;
				for (var i = 0; i < arrMarkers.length; ++i) {
					arrMarkers[i].setVisible(false);
				};

				if (window.innerHeight > window.innerWidth) {
					MAP.initMap("40.0902", "-98.7129", 3, true, false);
				} else {
					MAP.initMap("40.0902", "-110.7129", 4, true, false);
				}

				$('.info-cdc').removeClass('none');
			},

			showMarkers: function showMarkers() {
				var arrMarkers = MAP._markers;
				for (var i = 0; i < arrMarkers.length; ++i) {
					arrMarkers[i].setVisible(true);
				};

				if (window.innerHeight > window.innerWidth) {
					MAP.initMap("40.0902", "-98.7129", 3, false);
				} else {
					MAP.initMap("40.0902", "-110.7129", 4, false);
				}

				$('.info-cdc').addClass('none');
			},

			openInfoWin: function openInfoWin(marker, msg) {
				google.maps.event.addListener(marker, 'click', function () {
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
		var zipCode = sessionStorage.getItem('zip');

		if (zipCode) {
			var zip = true;
		} else {
			var zip = false;
		}

		// Init Maps
		if (window.innerHeight > window.innerWidth) {
			MAP.initMap("40.0902", "-98.7129", 3, false, zip);
		} else {
			MAP.initMap("40.0902", "-110.7129", 4, false, zip);
		}

		/*
  *	Get states databox
  */
		$http.get($urlBase + '/states').success(function (data, status, headers, config) {
			$scope.stateList = data; // State list

			// Initial position dataBox
			$scope.infoDataBox = {
				'surveys': data[0].data.total_surveys,
				'nosymptoms': data[0].data.no_symptoms,
				'nosymptomspercent': data[0].data.none_percentage,
				'symptoms': data[0].data.symptoms,
				'symptomspercent': data[0].data.symptoms_percentage,
				'flulike': data[0].data.ili,
				'flulikepercent': data[0].data.ili_percentage
			};
		});

		/*
  *	Get info's data box
  */
		$scope.updateInfoDataBox = function () {
			var center = JSON.parse(sessionStorage.getItem('centerMap')),
			    zoom = Number(sessionStorage.getItem('zoomMap')),
			    lat = center.latitude,
			    lon = center.longitude;

			$scope.infoDataBox = JSON.parse(sessionStorage.getItem('objDataSurvey'));
			MAP.initMap(lat, lon, zoom);
			$scope.$apply(); // Update $scope
		};

		$rootScope.$on('updateInfoDataBox', $scope.updateInfoDataBox);

		/*
  *	Hide/Show markers
  */
		$scope.hideMarkers = function () {
			MAP.hideMarkers();
		};
		$scope.showMarkers = function () {
			MAP.showMarkers();
		};

		/*
  *	Flu News
  */
		$http.get($urlBase + '/flu-news.json?FNY_Site=flunearyou.org').success(function (data, status) {
			$scope.news = data;
		});

		$scope.showReadMore = true;

		/*
  *	Tabs about
  */
		$scope.tab1 = true;
		$scope.tab2 = false;
		$scope.changeTab = function (tab) {
			if (tab == 'tab1') {
				$scope.tab1 = true;
				$scope.tab2 = false;
			} else {
				$scope.tab1 = false;
				$scope.tab2 = true;
			};
		};
	});
}]);
//# sourceMappingURL=mapCtrl.js.map

/*
*	Controller: homeCtrl
*/

'use strict';

app.controller('navCtrl', ['$scope', '$rootScope', '$translate', '$localStorage', function ($scope, $rootScope, $translate, $localStorage) {

	/*
 *	Init
 */
	$scope.isLogged = function () {
		// Hide Join Us button
		if (localStorage.getItem('userLogged')) {
			var userLogged = JSON.parse(localStorage.getItem('userLogged'));
			$scope.userLogged = true;
			$scope.userLoggedEmail = userLogged.email;
		} else {
			$scope.userLogged = false;
			$scope.userLoggedEmail = '';
		};
	};

	$rootScope.$on("IS_LOGGED", $scope.isLogged);

	// Url
	var url = window.location.href;
	if (url.indexOf('landing') != -1) {
		$scope.urlLogo = '#/landing';
	} else {
		$scope.urlLogo = '#/';
	}

	$scope.logout = function () {
		$scope.custom = false;
		localStorage.removeItem('userLogged');
		localStorage.removeItem('user_household_id');
		localStorage.removeItem('objHouseholdEdit');
		$rootScope.$emit("IS_LOGGED");
	};

	// Toggle dropdown
	$scope.custom = false;
	$scope.toggleCustom = function () {
		$scope.custom = $scope.custom === false ? true : false;
	};

	// Change language
	$scope.changeLanguage = function (lng) {
		$translate.use(lng);
	};

	$scope.$watch(function () {
		return $localStorage.language;
	}, function () {
		$scope.lang = $localStorage.language;
	});
}]);
//# sourceMappingURL=navCtrl.js.map

/*
*	Controller: homeCtrl
*/

'use strict';

app.controller('homeCtrl', ['$scope', '$rootScope', '$http', '$urlBase', '$window', 'session', function ($scope, $rootScope, $http, $urlBase, $window, session) {
	session.then(function () {
		/*
  *	Init
  */
		if (!localStorage.getItem('userLogged')) {
			$("#modal-join-us").modal();
		}
		localStorage.removeItem('landing');
		$scope.isLogged = function () {
			var userLogged = localStorage.getItem('userLogged');
			if (userLogged) {
				$('.btn-cta').addClass('none');
			} else {
				$('.btn-cta').removeClass('none');
			};
		};
		$rootScope.$on("IS_LOGGED", $scope.isLogged);

		// ScrollTop all pages
		$scope.scrolltop = function () {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		};
		$rootScope.$on('SCROLL_TOP', $scope.scrolltop);

		// Url
		var url = window.location.href;
		if (url.indexOf('landing') != -1) {
			$scope.urlLogo = '#/';
		} else {
			$scope.urlLogo = '#/landing';
		}

		/*
  *	Calls
  */
		$rootScope.$emit("NEWS");
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		/*
  *	Redirect for the map
  */
		$scope.mapZipCode = function (zip) {
			sessionStorage.setItem('zip', zip);
			$window.location.href = '#/map';
		};

		/*
  *	Get states databox
  */
		$http.get($urlBase + '/states').success(function (data, status, headers, config) {
			$scope.stateList = data; // State list

			// Initial position dataBox
			$scope.infoDataBox = {
				'surveys': data[0].data.total_surveys,
				'nosymptoms': data[0].data.no_symptoms,
				'nosymptomspercent': data[0].data.none_percentage,
				'symptoms': data[0].data.symptoms,
				'symptomspercent': data[0].data.symptoms_percentage,
				'flulike': data[0].data.ili,
				'flulikepercent': data[0].data.ili_percentage
			};
		});

		/*
  *	Flu News
  */
		$http.get($urlBase + '/flu-news.json?FNY_Site=flunearyou.org').success(function (data, status) {
			$scope.news = data;
		});

		$scope.showReadMore = true;

		/*
  *	Tabs about
  */
		$scope.tab1 = true;
		$scope.tab2 = false;
		$scope.changeTab = function (tab) {
			if (tab == 'tab1') {
				$scope.tab1 = true;
				$scope.tab2 = false;
			} else {
				$scope.tab1 = false;
				$scope.tab2 = true;
			};
		};
	});
}]);
//# sourceMappingURL=homeCtrl.js.map

/*
*	Controller: homeCtrl
*/

'use strict';

app.controller('landingCtrl', ['$scope', '$rootScope', '$http', '$urlBase', '$window', 'session', 'Facebook', 'GooglePlus', function ($scope, $rootScope, $http, $urlBase, $window, session, Facebook, GooglePlus) {
	session.then(function () {
		/*
  *	Init
  */
		if (localStorage.getItem('userLogged') && !localStorage.getItem('landing')) {
			$window.location.href = '#/map';
			localStorage.setItem('landing', true);
		} else {
			$window.location.href = '#/landing';
		}

		$scope.isLogged = function () {
			var userLogged = localStorage.getItem('userLogged');
			if (userLogged) {
				$('.btn-cta').addClass('none');
			} else {
				$('.btn-cta').removeClass('none');
			};
		};
		$rootScope.$on("IS_LOGGED", $scope.isLogged);

		// ScrollTop all pages
		$scope.scrolltop = function () {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		};
		$rootScope.$on('SCROLL_TOP', $scope.scrolltop);

		/*
  *	Calls
  */
		$rootScope.$emit("NEWS");
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		/*
  *	Redirect for the map
  */
		$scope.mapZipCode = function (zip) {
			sessionStorage.setItem('zip', zip);
			$window.location.href = '#/map';
		};

		/*
  *	Get states databox
  */
		$http.get($urlBase + '/states').success(function (data, status, headers, config) {
			$scope.stateList = data; // State list

			// Initial position dataBox
			$scope.infoDataBox = {
				'surveys': data[0].data.total_surveys,
				'nosymptoms': data[0].data.no_symptoms,
				'nosymptomspercent': data[0].data.none_percentage,
				'symptoms': data[0].data.symptoms,
				'symptomspercent': data[0].data.symptoms_percentage,
				'flulike': data[0].data.ili,
				'flulikepercent': data[0].data.ili_percentage
			};
		});

		/*
  *	Flu News
  */
		$http.get($urlBase + '/flu-news.json?FNY_Site=flunearyou.org').success(function (data, status) {
			$scope.news = data;
		});

		$scope.showReadMore = true;

		/*
  *	Tabs about
  */
		$scope.tab1 = true;
		$scope.tab2 = false;
		$scope.changeTab = function (tab) {
			if (tab == 'tab1') {
				$scope.tab1 = true;
				$scope.tab2 = false;
			} else {
				$scope.tab1 = false;
				$scope.tab2 = true;
			};
		};
	});

	/*
 *	Login Social
 */
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.newUser = {};
	$scope.resgisterSocial = true;
	$scope.toggleResgisterSocial = function (redeSocial) {
		if (redeSocial == 'FB') {
			Facebook.login(function (response) {
				if (response.status == 'connected') {
					$scope.showRegisterForm = true;
					$scope.registerFacebook();
				}
			}, { scope: 'email' });
		} else {
			GooglePlus.login().then(function (authResult) {
				if (authResult.status.google_logged_in == true) {
					$scope.showRegisterForm = true;
					$scope.registerGooglePlus(authResult);
				};
			});
		};
	};

	/*
 *	Register by FB
 */
	$scope.registerFacebook = function (zip) {
		var zipCode = zip;

		Facebook.api('/me', function (response) {
			$scope.newUser.email = response.email;
			if (response.gender == 'male') {
				$scope.newUser.gender = 'M';
			} else {
				$scope.newUser.gender = 'F';
			}
		});
	};

	/*
 *	Register by FB
 */
	$scope.registerGooglePlus = function (authResult) {
		var token = authResult.access_token;

		$http.post($urlBase + '/user/login/googleplus', { "access_token": token }).success(function (data, status, result) {
			if (status == 200) {
				console.log(data);
				$scope.newUser.email = data.info.basic.email;
				$scope.newUser.gender = data.info.basic.gender;
			}
		}).error(function (data, status, result) {});
	};
}]);
//# sourceMappingURL=landingCtrl.js.map

/*
*	About Controller
*/

'use strict';

app.controller('aboutCtrl', ['$scope', 'session', function ($scope, session) {
	session.then(function () {
		/*
  *	Init
  */
		$rootScope.$emit("SCROLL_TOP");
	});
}]);
//# sourceMappingURL=aboutCtrl.js.map

/*
*	About Controller
*/

'use strict';

app.controller('fluNewsCtrl', ['$scope', '$http', '$urlBase', '$window', '$rootScope', 'session', function ($scope, $http, $urlBase, $window, $rootScope, session) {
	session.then(function () {
		/*
  *	Init
  */
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		$scope.news = function () {
			$http.get($urlBase + '/flu-news.json?FNY_Site=flunearyou.org').success(function (data, status) {
				$scope.news = data;
			});

			$scope.showReadMore = true;
			if ($window.location.href.indexOf('flu-news') != -1) {
				$scope.showReadMore = false;
			}
		};

		$rootScope.$on("NEWS", $scope.news);
		$rootScope.$emit("NEWS");
	});
}]);
//# sourceMappingURL=fluNewsCtrl.js.map

/*
*	About Controller
*/

'use strict';

app.controller('pressCtrl', ['$scope', '$http', '$urlBase', 'session', '$rootScope', function ($scope, $http, $urlBase, session, $rootScope) {
	session.then(function () {

		/*
  *	Init
  */
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		$http.get($urlBase + '/press.json').success(function (data, status) {
			var press2015 = [],
			    press2014 = [];

			for (var i = 0; i < data.length; i++) {
				var press = data[i];
				if (press.publicationDateYear == '2015') {
					press2015.push(press);
				} else {
					press2014.push(press);
				}
			}

			$scope.press2015 = press2015;
			$scope.press2014 = press2014;
		}).error(function (data, status) {
			console.log(data);
		});
	});
}]);
//# sourceMappingURL=pressCtrl.js.map

/*
*	Modals Controller
*/

'use strict';

app.controller('modalsCtrl', ['$scope', '$rootScope', '$http', '$urlBase', '$window', '$fny', 'Facebook', 'GooglePlus', function ($scope, $rootScope, $http, $urlBase, $window, $fny, Facebook, GooglePlus) {

	/*
 *	Init
 */
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.newUser = {};
	$scope.resgisterSocial = true;
	$scope.toggleResgisterSocial = function (redeSocial) {
		if (redeSocial == 'FB') {
			Facebook.login(function (response) {
				if (response.status == 'connected') {
					$scope.showRegisterForm = true;
					$scope.registerFacebook();
				}
			}, { scope: 'email' });
		} else {
			GooglePlus.login().then(function (authResult) {
				if (authResult.status.google_logged_in == true) {
					$scope.showRegisterForm = true;
					$scope.registerGooglePlus(authResult);
				};
			});
		};
	};

	/*
 *	Login
 */
	$scope.login = function (email, pass, event) {
		var loginObj = {
			"email": email,
			"password": pass
		};

		$fny.login(loginObj);
	};

	$scope.checkIfEnterKeyWasPressed = function (email, pass, event) {
		if (event.keyCode == 13) {
			$scope.login(email, pass, event);
		}
	};

	/*
 *	Login by Facebook
 */
	$scope.loginFacebook = function () {
		Facebook.login(function (response) {
			if (response.status == 'connected') {
				var token = response.authResponse.accessToken;
				$http.post($urlBase + '/user/login/facebook', { "access_token": token }).success(function (data, status, result) {
					console.log('loginFacebook');
					console.log(data);
					console.log(status);
					console.log(result);

					if (status == 200) {
						var nickname = data.info.basic.nickname,
						    userToken = data.info.basic.token,
						    userEmail = data.info.basic.email,
						    userLoggedObj = {
							'name': nickname,
							'email': userEmail,
							'token': userToken
						};

						localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
						$rootScope.$emit("IS_LOGGED");
						$('.modal').modal('hide');
					}
				}).error(function (data, status, result) {});
			}
		}, { scope: 'email' });
	};

	/*
 *	Login by Google Plus
 */
	$scope.loginGooglePlus = function () {

		GooglePlus.login().then(function (authResult) {
			if (authResult.status.google_logged_in == true) {
				var token = authResult.access_token;

				$http.post($urlBase + '/user/login/googleplus', { "access_token": token }).success(function (data, status, result) {
					if (status == 200) {
						var tokenUser = data.info.basic.token;
						$fny.loginByToken(tokenUser);
					}
				}).error(function (data, status, result) {});
			}
		}, function (err) {
			console.log(err);
		});
	};

	/*
 *	Register new user	
 */
	$scope.sendNewUser = function () {
		var objNewUser = $scope.newUser;

		if (objNewUser.gender == undefined) {
			$scope.isGenderValid = false;
			$scope.errorMsg = 'Gender is empty';
		} else {
			$fny.registerNewUser(objNewUser);
		}
		return false;
	};

	/*
 *	Register by FB
 */
	$scope.registerFacebook = function (zip) {
		var zipCode = zip;

		Facebook.api('/me', function (response) {
			$scope.newUser.email = response.email;
			if (response.gender == 'male') {
				$scope.newUser.gender = 'M';
			} else {
				$scope.newUser.gender = 'F';
			}
		});
	};

	/*
 *	Register by FB
 */
	$scope.registerGooglePlus = function (authResult) {
		var token = authResult.access_token;

		$http.post($urlBase + '/user/login/googleplus', { "access_token": token }).success(function (data, status, result) {
			if (status == 200) {
				console.log(data);
				$scope.newUser.email = data.info.basic.email;
				$scope.newUser.gender = data.info.basic.gender;
			}
		}).error(function (data, status, result) {});
	};

	/*
 *
 *	Validation form
 *
 */
	$scope.isEmailValid = true;
	$scope.isZipEmpty = true;
	$scope.isPassEmpty = true;
	$scope.isYearEmpty = true;
	$scope.isGenderValid = true;

	$scope.validaEmail = function (email) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		$scope.isEmailValid = re.test(email);
		$scope.errorMsg = 'Email invalid';
		return $scope.isEmailValid;
	};

	$scope.passEmpty = function (pass) {
		if (pass == '' || pass == undefined || pass == null || pass.length < 3 || pass.length > 12) {
			$scope.isPassEmpty = false;
			$scope.errorMsg = 'Password must have bettwen 3 and 12 caracters';
		} else {
			$scope.isPassEmpty = true;
		}
	};

	$scope.zipEmpty = function (val) {

		var zip = String(val);

		if (zip == '' || zip == undefined || zip == null || zip.length < 5 || zip.length > 5) {
			$scope.errorMsg = 'Zip code must have 5 characters';
			$scope.isZipEmpty = false;
		} else {
			$scope.isZipEmpty = true;
		}
	};

	$scope.yearEmpty = function (val) {

		var year = String(val);

		if (year == '' || year == undefined || year == null || year.length < 4 || year.length > 4) {
			$scope.errorMsg = 'Year must have 4 characters';
			$scope.isYearEmpty = false;
		} else {
			$scope.isYearEmpty = true;
		}
	};
}]);
//# sourceMappingURL=modalsCtrl.js.map

/*
*	Report Controller
*/
'use strict';

app.controller('reportCtrl', ['$scope', '$route', '$rootScope', '$window', '$location', '$uibModal', 'reportApi', 'userApi', 'session', '$timeout', function ($scope, $route, $rootScope, $window, $location, $uibModal, reportApi, userApi, session, $timeout) {
	session.then(function () {

		/*
  *	Init
  */

		$('#modal-join-us, #modal-login').modal('hide');
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		$scope.optionsDate = new Date();
		$scope.options = { format: 'dd/mm/yy', selectYears: true };
		$scope.no_symptoms = false;

		// Arrays
		$scope.page_members = false;
		$scope.page_symptoms = false;
		$scope.page_vaccionations = false;
		$scope.page_more_members = false;
		$scope.vaccinations = [];
		$scope.members = [];
		$scope.members_ids = [];
		$scope.selected_ids = [];
		$scope.current_id = null;
		$scope.survey = { symptoms: [] };
		$scope.travel_where = null;
		$scope.checks = [];
		$scope.checks_perm = [];

		// Week of
		var d = new Date();
		var day = d.getDay(),
		    diff = d.getDate() - 7 - day + (day == 0 ? -6 : 1);

		$scope.week_of = new Date(d.setDate(diff));
		$scope.week_end = new Date(d.setDate(diff + 6));
		$scope.next_week = new Date(d.setDate(diff + 7));

		var openModalThanks = function openModalThanks() {
			var modalInstance = $uibModal.open({
				templateUrl: 'views/partials/modal-thanks.html',
				controller: 'ModalThanksCtrl',
				size: 'lg',
				resolve: {
					items: function items() {
						return $scope.items;
					}
				}
			});
		};

		var openPage = function openPage(page) {
			$scope.page_members = page == 'page_members' ? true : false;
			$scope.page_symptoms = page == 'page_symptoms' ? true : false;
			$scope.page_vaccionations = page == 'page_vaccionations' ? true : false;
			$scope.page_more_members = page == 'page_more_members' ? true : false;
		};

		var getUser = function getUser() {

			userApi.getUser(function (result) {
				// console.log(result);
				if (result.info) {
					$scope.user = result.info.basic;
					$scope.user_vaccionations = result.info.vaccinations;
					$scope.households = result.info.household;

					if ($scope.households.length >= 1) {
						openPage('page_members');
					} else {
						openPage('page_symptoms');
						$scope.selected_ids = [$scope.user.user_id];
						$scope.current_id = $scope.user.user_id;
					}

					// console.log('User: ', $scope.user);
					// console.log('RTR: ', $scope.user.current_survey);

					var current_survey = $scope.user.current_survey,
					    first_survey = $scope.user.first_survey,
					    has_symptoms = $scope.user.has_symptoms;

					calender(result.info, current_survey, first_survey, has_symptoms);

					$scope.members_ids.push($scope.user.user_id);
					angular.forEach($scope.households, function (value, key) {
						$scope.members_ids.push(value.user_household_id);
					});
				}
			});
		};

		// Show/Hide Calender
		var calender = function calender(info, current_survey, first_survey, has_symptoms) {
			$scope.showUiCalender = false;

			var userCurrentSurvey = current_survey,
			    userFirstSurvey = first_survey,
			    userHasSurvey = has_symptoms;

			// Condition: If a new user (the first survey)
			if (userFirstSurvey) {
				$scope.showUiCalender = true;
			};

			// Condition: The firt survey of the weekly
			if (!userCurrentSurvey) {
				$scope.showUiCalender = true;
			};

			// Condition: If the user reported 'no symptoms' and then report any symtoms
			if (!has_symptoms && userCurrentSurvey) {
				$scope.showUiCalender = true;
			};

			// Condition: If the second respor in the same weekle
			if (has_symptoms && userCurrentSurvey) {
				$scope.showUiCalender = false;
			};
		};

		$scope.termometro = true;
		$scope.teste = function () {
			$scope.termometro = $scope.termometro === false ? true : false;
		};

		var getChecks = function getChecks() {
			reportApi.getChecks(function (result) {
				// console.log(result);
				if (result) {
					$scope.checks = result.checks;
					$scope.members = result.checks;
					$scope.checks_perm = result.checks_perm;
				}
			});
		};

		var getReportsThisWeek = function getReportsThisWeek() {
			reportApi.getReportsThisWeek(function (result) {
				if (result) {
					$scope.reports_this_week = result;
				}
			});
		};

		var redirectToSuccess = function redirectToSuccess() {
			openModalThanks();
			$location.path("/map");
		};

		var askForMembersOrGoHome = function askForMembersOrGoHome() {
			if ($scope.households.length == 0 && $scope.user.more_members != 'N') {
				openPage('page_more_members');
			} else {
				redirectToSuccess();
			}
		};

		var successReport = function successReport() {
			if (!$scope.user.current_survey && $scope.user_vaccionations.is_vaccinated != 'Y') {
				openPage('page_vaccionations');
			} else {
				askForMembersOrGoHome();
			}
		};

		$scope.goBack = function () {
			openPage('page_members');
			getChecks();
		};

		$scope.everyoneHealthy = function () {
			reportApi.everyoneHealthy(function (result) {
				if (result) {
					successReport();
				}
			});
		};

		$scope.selectMembers = function () {
			if ($scope.members.length > 0) {
				$scope.selected_ids = $scope.members.slice();
				$scope.openSymtoms();
			} else {
				$scope.error = 'You must select at least one member';
			}
		};

		$scope.openSymtoms = function () {
			if ($scope.members.length <= 0) {
				successReport();
			} else {
				openPage('page_symptoms');
				$scope.current_id = $scope.members.shift();
				angular.forEach($scope.households, function (value, key) {
					if (value.user_household_id == $scope.current_id) {
						$scope.user_name = value.nickname;
					}
				});
			}
		};

		$scope.sendReport = function () {

			if ($scope.survey.symptoms.length == 0 && $scope.no_symptoms == false) {
				$scope.error_symptom = true;
				return;
			}
			var index = $scope.members_ids.indexOf($scope.current_id);
			if (index > -1) {
				$scope.members_ids.splice(index, 1);
			}
			reportApi.sendReport($scope.survey, $scope.user.user_id, $scope.current_id, $scope.members_ids, $scope.user.current_survey, function (result) {
				$scope.openSymtoms();
			});
		};

		$scope.sendVaccine = function () {
			if ($scope.vaccinations.user && $scope.vaccinations.user.hasOwnProperty($scope.user.user_id)) {
				var data = {
					flu_vaccine: $scope.vaccinations.user[$scope.user.user_id],
					user_id: $scope.user.user_id,
					user_household_id: null
				};
				reportApi.sendVaccine(data, function () {});
			}
			if ($scope.vaccinations.user && $scope.vaccinations.user.hasOwnProperty($scope.user.user_id)) {
				for (var id in $scope.vaccinations.household) {
					if ($scope.vaccinations.household.hasOwnProperty(id)) {
						data = {
							flu_vaccine: $scope.vaccinations.household[id],
							user_id: $scope.user.user_id,
							user_household_id: id
						};
						reportApi.sendVaccine(data, function () {});
					}
				}
			}
			askForMembersOrGoHome();
		};

		$scope.sendReminder = function (remind_me) {
			if (remind_me == 'Y') {
				$location.path("/settings");
			} else if (remind_me == 'N') {
				reportApi.sendReminder(function (result) {

					redirectToSuccess();
				});
			} else {

				redirectToSuccess();
			}
		};

		getUser();
		getChecks();
		getReportsThisWeek();
	});
}]);
//# sourceMappingURL=reportCtrl.js.map

/*
*
*/

'use strict';

app.controller('surveyCtrl', ['$scope', '$rootScope', '$window', 'session', '$uibModal', function ($scope, $rootScope, $window, session, $uibModal) {
	session.then(function () {
		/*
  *	Init
  */
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		$scope.optionsDate = new Date();
		$scope.options = { format: 'dd/mm/yy', selectYears: true };

		// Toggle disabledSymptoms
		$scope.disabledSymptoms = false;
		$scope.toggleDisabledSymptoms = function () {
			$scope.temperature = false;
			$scope.disabledSymptoms = $scope.disabledSymptoms === false ? true : false;
		};

		// Toggle temperature
		$scope.temperature = false;
		$scope.toggleTemperature = function () {
			$scope.temperature = $scope.temperature === false ? true : false;
		};

		// Toggle Treveling
		$scope.treveling = false;
		$scope.toggleTreveling = function () {
			$scope.treveling = $scope.treveling === false ? true : false;
		};

		$scope.sendSurvey = function () {
			$window.location.href = '#/map';
		};
	});
}]);
//# sourceMappingURL=surveyCtrl.js.map

/*
*	Setting Controller
*/

'use strict';

app.controller('settingCtrl', ['$scope', '$http', '$urlBase', '$uibModal', '$timeout', '$translate', '$rootScope', '$route', 'growl', 'userApi', 'householdApi', 'session', function ($scope, $http, $urlBase, $uibModal, $timeout, $translate, $rootScope, $route, growl, userApi, householdApi, session) {
	session.then(function () {

		/*
  *	Init
  */
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");
		$scope.showUserUpdate = false;
		$scope.households = [];

		/*
  *	Get user account
  */
		if (localStorage.getItem('userLogged')) {
			var user = JSON.parse(localStorage.getItem('userLogged')),
			    token = user.token;
		} else {
			return false;
		}

		$scope.openModalConfirm = function (_household) {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/partials/modal-confirm-activation.html',
				controller: 'ModalActivationCtrl',
				resolve: {
					household: function household() {
						return _household;
					},
					getHouseholds: function getHouseholds() {
						return _getHouseholds;
					}
				}
			});
		};

		$scope.openModalEdit = function (_household2) {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/partials/modal-edit-household.html',
				controller: 'ModalEditHouseholdCtrl',
				resolve: {
					household: function household() {
						return _household2;
					},
					getHouseholds: function getHouseholds() {
						return _getHouseholds;
					}
				}
			});
		};

		var showMessage = function showMessage(data) {
			if ($translate.proposedLanguage() == 'es' && data.message_es) {
				growl.addSuccessMessage(data.message_es);
			} else {
				growl.addSuccessMessage(data.message);
			}
		};

		var getUser = function getUser() {
			userApi.getUser(function (data) {
				$scope.user = data.info.basic;
				$scope.user.zip = data.info.place.zip;

				// Get month and year birthdate
				var index = $scope.user.dob.indexOf('/');
				$scope.user.birthyear = $scope.user.dob.slice(index + 1);
				$scope.user.birthmonth = $scope.user.dob.slice(0, index);
			});
		};

		var _getHouseholds = function _getHouseholds() {
			householdApi.getHuseholds(function (data) {
				if (data.household) {
					$scope.households = data.household;
				}
			});
		};

		$scope.sendNewHousehold = function () {
			console.log($scope.newHousehold);
			householdApi.sendNewHousehold($scope.newHousehold, function (data) {
				if (data) {
					_getHouseholds();
					$scope.addMember = false;
					$rootScope.$emit("SCROLL_TOP");
					showMessage(data);
				}
			});
		};

		$scope.userEdit = function () {
			userApi.userEdit($scope.user, function (data) {
				if (data) {
					$scope.showUserUpdate = false;
					$scope.user.dob = $scope.user.birthmonth + '/' + $scope.user.birthyear;
					showMessage(data);
				}
			});
		};

		$scope.sendPassword = function () {
			var objPass = {
				'old_password': $scope.old_password,
				'password': $scope.password,
				'confirm_password': $scope.confirm_password
			};
			userApi.sendPassword(objPass, function (data) {
				if (data) {
					$scope.changePass = false;
					showMessage(data);
				}
			});
		};

		getUser();
		_getHouseholds();
	});
}]);
//# sourceMappingURL=settingCtrl.js.map

/*
*
*/

'use strict';

app.controller('unsubscribeCtrl', ['$scope', '$http', '$urlBase', '$window', '$timeout', '$rootScope', 'session', function ($scope, $http, $urlBase, $window, $timeout, $rootScope, session) {
	session.then(function () {

		/*
  *	Init
  */
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		/*
  *	Get user account
  */
		var user = JSON.parse(localStorage.getItem('userLogged')),
		    token = user.token;

		$scope.sendUnsubscribe = function (reason, reasonTxt) {

			var objUnsubscribe = {
				'token': token,
				'pauseoption': reason,
				'reason': reasonTxt
			};
			$http.post($urlBase + '/user/unsubscribe?t=' + token, objUnsubscribe).success(function (data, status) {
				$scope.unsubscribeSuccess = true;
				$timeout(function () {
					$scope.unsubscribeSuccess = false;
					$window.location.href = '/#';
					localStorage.removeItem('userLogged');
					$rootScope.$emit("IS_LOGGED");
				}, 1000);
			});
		};
	});
}]);
//# sourceMappingURL=unsubscribeCtrl.js.map

'use strict';

app.controller('ModalThanksCtrl', ['$scope', '$uibModalInstance', 'items', '$http', '$urlBase', '$rootScope', '$window', function ($scope, $uibModalInstance, items, $http, $urlBase, $rootScope, $window) {

	/*
 *	Init
 */
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	if (localStorage.getItem('userLogged')) {
		var user = JSON.parse(localStorage.getItem('userLogged')),
		    token = user.token;
	} else {
		return false;
	}

	/*
 *	Get infos report card
 */
	$http.get($urlBase + '/stats.json', { headers: { 'token': token } }).success(function (data) {
		$scope.reportCard = data;
	});

	$scope.ok = function () {
		$uibModalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.winReload = function () {
		$window.location.reload();
	};
}]);
//# sourceMappingURL=modalThanksCtrl.js.map

'use strict';

app.controller('ModalActivationCtrl', ['$scope', '$uibModalInstance', '$translate', 'growl', 'householdApi', 'household', 'getHouseholds', '$rootScope', function ($scope, $uibModalInstance, $translate, growl, householdApi, household, getHouseholds, $rootScope) {
	/*
 *	Init
 */
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.household = household;

	var showMessage = function showMessage(data) {
		if ($translate.proposedLanguage() == 'es' && data.message_es) {
			growl.addSuccessMessage(data.message_es);
		} else {
			growl.addSuccessMessage(data.message);
		}
	};

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.sendActivation = function () {
		householdApi.sendActivation($scope.household, function (result) {
			if (result) {
				$scope.ok();
				getHouseholds();
				showMessage(result);
			}
		});
	};
}]);
//# sourceMappingURL=modalActivationCtrl.js.map

'use strict';

app.controller('ModalEditHouseholdCtrl', ['$scope', '$uibModalInstance', '$translate', 'growl', 'householdApi', 'household', 'getHouseholds', '$rootScope', function ($scope, $uibModalInstance, $translate, growl, householdApi, household, getHouseholds, $rootScope) {

	/*
 *	Init
 */
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.household = household;

	var index = $scope.household.dob.indexOf('/');
	$scope.household.birthyear = $scope.household.dob.slice(index + 1);
	$scope.household.birthmonth = $scope.household.dob.slice(0, index);

	var showMessage = function showMessage(data) {
		if ($translate.proposedLanguage() == 'es' && data.message_es) {
			growl.addSuccessMessage(data.message_es);
		} else {
			growl.addSuccessMessage(data.message);
		}
	};

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.sendHouseholdEdit = function () {
		householdApi.sendHouseholdEdit($scope.household, function (result) {
			if (result) {
				$scope.ok();
				getHouseholds();
				showMessage(result);
			}
		});
	};
}]);
//# sourceMappingURL=modalEditHouseholdCtrl.js.map

/*
*	Health Report Controller
*/

'use strict';

app.controller('healthReportCtrl', ['$scope', '$rootScope', '$http', '$urlBase', 'session', function ($scope, $rootScope, $http, $urlBase, session) {
	session.then(function () {
		/*
  *	Init
  */
		if (localStorage.getItem('userLogged')) {
			var user = JSON.parse(localStorage.getItem('userLogged')),
			    token = user.token;
		} else {
			return false;
		}

		/*
  *	Calls
  */
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");

		/*
  *	Get infos report card
  */
		$http.get($urlBase + '/stats.json', { headers: { 'token': token } }).success(function (data) {
			$scope.reportCard = data;
		});

		/*
  *	Get infos health report
  */
		$http.get($urlBase + '/reports.json', { headers: { 'token': token } }).success(function (data) {
			$scope.healthReports = data;
			$scope.healthReportsSurveys = data.surveys;
		});
	});
}]);
//# sourceMappingURL=healthReportCtrl.js.map

/*
*	Directive: Choose State and then show data
*/

'use strict';

app.directive('chooseStateDirective', ['$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('change', function () {
				$window.location.href = '#/map';

				var stateSelected = elem.find(':selected'),
				    surveys = Number(stateSelected.attr('data-surveys')),
				    nosymptoms = Number(stateSelected.attr('data-nosymptoms')),
				    nosymptomspercent = Number(stateSelected.attr('data-nosymptomspercent')),
				    symptoms = Number(stateSelected.attr('data-symptoms')),
				    symptomspercent = Number(stateSelected.attr('data-symptomspercent')),
				    flulike = Number(stateSelected.attr('data-flulike')),
				    flulikepercent = Number(stateSelected.attr('data-flulikepercent')),
				    latitude = Number(stateSelected.attr('data-lat')),
				    longitude = Number(stateSelected.attr('data-lon')),
				    value = stateSelected.attr('value'),
				    color = stateSelected.attr('data-color'),
				    image = stateSelected.attr('value').replace(' ', '-');

				var objDataSurvey = {
					'surveys': surveys,
					'nosymptoms': nosymptoms,
					'nosymptomspercent': nosymptomspercent,
					'symptoms': symptoms,
					'symptomspercent': symptomspercent,
					'flulike': flulike,
					'flulikepercent': flulikepercent
				};

				var centerState = {
					'latitude': latitude,
					'longitude': longitude
				};

				var centerDefault = {
					latitude: 40.0902,
					longitude: -110.7129
				};

				var colorImage = {
					color: color,
					image: image
				};

				var zoomMap = value == 'United States' ? zoomMap = 4 : zoomMap = 6;
				var centerMap = value == 'United States' ? centerMap = centerDefault : centerMap = centerState;

				// Open Flu-map
				localStorage.setItem('showFluMap', 'true');
				$rootScope.$emit("SHOWFLUMAP");

				// Update dataBox
				sessionStorage.setItem('objDataSurvey', JSON.stringify(objDataSurvey));
				sessionStorage.setItem('centerMap', JSON.stringify(centerMap));
				sessionStorage.setItem('zoomMap', zoomMap);
				$timeout(function () {
					$('.wrapper-databox-image').css({
						'background': '' + colorImage.color + ' url(images/states/' + colorImage.image + '.png) no-repeat center center'
					});
					$rootScope.$emit('updateInfoDataBox');
				}, 500);
			});
		}
	};
}]);
//# sourceMappingURL=chooseStateDirective.js.map

/*
*
*/

// 'use strict';

// app.directive('inOutChecked', function(){
// 	return {
// 		restrict : 'A',
// 		link: function(scope, elem){
// 			elem.on('click', function(){
// 				var parent = $(this).parent().parent();
// 				parent.find('input[type="radio"]').removeAttr('checked');
// 				$(this).attr('checked', 'checked');
// 			});
// 		}
// 	}
// });
"use strict";
//# sourceMappingURL=inOutChecked.js.map

/*
*	Temperature Directive
*/

'use strict';

app.directive('temperature', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			var slide = function slide(event, ui) {

				var l = $(".ui-slider-handle").position().left,
				    v = ui.value,
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
	};
});
//# sourceMappingURL=temperatureDirective.js.map

/*
*	Disabled Survey Directive
*/

'use strict';

app.directive('disabledSurvey', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				var disabledSymptoms = scope.disabledSymptoms;
				if (disabledSymptoms) {
					$('.disabled').find('input').attr('disabled', true).attr('checked', false);
				} else {
					$('.disabled').find('input').attr('disabled', false);
				};
			});
		}
	};
});
//# sourceMappingURL=disabledSurveyDirective.js.map

/*
*	Show Traveling
*/

'use strict';

app.directive('showTraveling', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.find('input').on('click', function () {
				var isChecked = $('#conditional input').is(':checked');
				if (isChecked) {
					$('.fieldset-traveling').removeClass('none');
				} else {
					$('.fieldset-traveling').addClass('none');
				}
			});
		}
	};
});
//# sourceMappingURL=showTraveling.js.map

/*
*	Remove option directive 
*/

'use strict';

app.directive('removeOption', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			setTimeout(function () {
				elem.find('option').eq(0).remove();
			}, 1000);
		}
	};
});
//# sourceMappingURL=removeOption.js.map

/*
*	Select language directive
*/

'use strict';

app.directive('selectLanguage', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {

			elem.on('click', function () {
				elem.toggleClass('opened');
			});

			elem.find('.lng').on('click', function () {
				var lng = $(this).attr('data-lng');

				// Change language
				elem.find('.lng').removeClass('ativo');
				$(this).addClass('ativo');
			});
		}
	};
});
//# sourceMappingURL=selectLanguage.js.map

/*
*	Loading Button
*/

'use strict';

app.directive('loadingButton', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				$(this).button('loading');
				setTimeout(function () {
					$('.btn-login, .btn-loading').button('reset');
				}, 2000);
			});
		}
	};
});
//# sourceMappingURL=loadingButtonDirective.js.map

/*
*	AutoComlete Directive
*/

'use strict';

app.directive('autoComplete', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			setTimeout(function () {
				elem.chosen({});
			}, 1500);
		}
	};
});
//# sourceMappingURL=autoCompleteDirective.js.map

/*
*
*/

'use strict';

app.directive('openMenuMobile', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				$('#btn-menu-mobile').toggleClass('ativo');
				if ($('#btn-menu-mobile').hasClass('ativo')) {
					$('.nav-mobile').animate({
						'height': '360px'
					}, 'slow');
				} else {
					$('.nav-mobile').animate({
						'height': '0'
					}, 'slow');
				}
			});
		}
	};
});
//# sourceMappingURL=openMenuMobile.js.map

/*
*
*/

'use strict';

app.directive('showHideData', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				$(this).toggleClass('ativo');
				if ($(this).hasClass('ativo')) {
					$(this).find('button').text('HIDE DATA');
					$('#databox-mobile').animate({
						'height': '385px'
					}, 'slow');
				} else {
					$(this).find('button').text('SHOW DATA');
					$('#databox-mobile').animate({
						'height': '0'
					}, 'slow');
				}
			});
		}
	};
});
//# sourceMappingURL=showHideData.js.map

/*
*
*/

'use strict';

app.directive('uiCalender', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
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
				var minDay = min.getDate(),
				    minMonth = min.getMonth(),
				    minYear = min.getFullYear();

				// Max Date
				var maxDay = max.getDate(),
				    maxMonth = max.getMonth(),
				    maxYear = max.getFullYear();

				if (minDay > maxDay && minMonth == maxMonth) {
					var dateMonth = maxMonth + 1;
				} else {
					var dateMonth = maxMonth;
				}

				// console.log(min);
				// console.log(minYear, minMonth, minDay);
				// console.log(max);
				// console.log('maxMonth: ', maxMonth);
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
	};
});
//# sourceMappingURL=uiCalender.js.map

/*
*	Search Directive
*/

'use strict';

app.directive('search', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('keyup', function () {
				var search = $(this).val(),
				    count = 0;

				$('#questions ul li').each(function () {
					if ($(this).text().search(new RegExp(search, 'i')) < 0) {
						$(this).fadeOut();
					} else {
						$(this).show();
						count++;
					}
				});

				var resultsItem = count;
				$('#count-results').text(resultsItem);
			});
		}
	};
});
//# sourceMappingURL=searchDirective.js.map

/*
*
*/

'use strict';

app.directive('accordion', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				var height = $(this).find('p').height();
				$(this).toggleClass('open');
				if ($(this).hasClass('open')) {
					$(this).animate({
						'height': height + 140
					}, 200);
					$(this).find('span').css('transform', 'rotate(45deg)');
				} else {
					$(this).animate({
						'height': '80px'
					}, 200);
					$(this).find('span').css('transform', 'rotate(0deg)');
				};
			});
		}
	};
});
//# sourceMappingURL=accordionDirective.js.map

'use strict';

app.directive('symptomsList', ['$sce', function ($sce) {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			// var symptoms = "";

			// if (scope.report.fever == 1) symptoms += '<span translate="fever"></span>, ';
			// if (scope.report.cough == 1) symptoms += '<span translate="cough" data-tes="te"></span>, ';
			// if (scope.report.headache == 1) symptoms += '<span translate="headache"></span>, ';
			// if (scope.report.sorethroat == 1) symptoms += '<span translate="sore_throat"></span>, ';
			// if (scope.report.diarrhea == 1) symptoms += '<span translate="diarrhea"></span>, ';
			// if (scope.report.bodyache == 1) symptoms += '<span translate="bodyache"></span>, ';
			// if (scope.report.fatigue == 1) symptoms += '<span translate="fatigue"></span>, ';
			// if (scope.report.chills == 1) symptoms += '<span translate="chills"></span>, ';
			// if (scope.report.nausea == 1) symptoms += '<span translate="nausea"></span>, ';
			// if (scope.report.breath == 1) symptoms += '<span translate="breath"></span>, ';

			var symptoms = [];

			if (scope.report.fever == 1) symptoms.push('fever');
			if (scope.report.cough == 1) symptoms.push('cough');
			if (scope.report.headache == 1) symptoms.push('headache');
			if (scope.report.sorethroat == 1) symptoms.push('sorethroat');
			if (scope.report.diarrhea == 1) symptoms.push('diarrhea');
			if (scope.report.bodyache == 1) symptoms.push('bodyache');
			if (scope.report.fatigue == 1) symptoms.push('fatigue');
			if (scope.report.chills == 1) symptoms.push('chills');
			if (scope.report.nausea == 1) symptoms.push('nausea');
			if (scope.report.breath == 1) symptoms.push('breath');
			if (scope.report.rash == 1) symptoms.push('rash');
			if (scope.report.eye_pain == 1) symptoms.push('eye_pain');
			if (scope.report.yellow_eyes == 1) symptoms.push('yellow_eyes');
			if (scope.report.joint_pain == 1) symptoms.push('joint_pain');
			if (scope.report.red_eyes == 1) symptoms.push('red_eyes');
			if (scope.report.dark_urine == 1) symptoms.push('dark_urine');

			scope.report.symptoms = symptoms;
			// elem.text(symptoms).html();
			// elem.attr('translate', 'fever');
		}
	};
}]);
//# sourceMappingURL=symptomsList.js.map

/*
*
*/

'use strict';

app.directive('editHousehold', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				var nick = $(this).attr('data-nick'),
				    gender = $(this).attr('data-gender'),
				    niver = $(this).attr('data-niver'),
				    id = $(this).attr('data-id');

				// Get month and year birthdate
				var index = niver.indexOf('/'),
				    year = niver.slice(index + 1),
				    month = niver.slice(0, index);

				var objHouseholdEdit = {
					id: id,
					nickname: nick,
					gender: gender,
					niver: niver
				};

				localStorage.setItem('objHouseholdEdit', JSON.stringify(objHouseholdEdit));
				$rootScope.$emit('updateHousehold');
			});
		}
	};
}]);
//# sourceMappingURL=editHousehold.js.map

/*
*
*/

'use strict';

app.directive('openHealph', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				$(this).toggleClass('heightAuto');
				if ($(this).hasClass('heightAuto')) {
					$(this).find('span').css('transform', 'rotate(-45deg)');
				} else {
					$(this).find('span').css('transform', 'rotate(0deg)');
				};
			});
		}
	};
});
//# sourceMappingURL=openHealphReport.js.map

/*
*	Disabled Survey Directive
*/

'use strict';

app.directive('removeChecked', function () {
	return {
		restrict: 'A',
		link: function link(scope, elem) {
			elem.on('click', function () {
				if ($(this).hasClass('any-symptoms-below')) {
					$('.item-symptoms').attr('checked', false);
				} else {
					setTimeout(function () {
						$('.item-symptoms').attr('checked', false);
					}, 2500);
				}
			});
		}
	};
});
//# sourceMappingURL=removeChecked.js.map

'use strict';

/**
 * @ngdoc service
 * @name flunearyouV2App.dataService
 * @description
 * # dataService
 * Service in the flunearyouV2App.
 */

app.service('dataService', ['$scope', 'socket', function ($scope, socket) {

  var socket = io.connect();
  var obj = {};
  var feeds = [];

  obj.getFeeds = function (callback) {
    socket.on('stream', function (tweetJSON) {
      feeds = tweetJSON;
      callback(tweetJSON);
    });
  };

  return obj;
}]);
//# sourceMappingURL=dataservice.js.map

'use strict';

/**
 * @ngdoc service
 * @name flunearyouV2App.cdcstates
 * @description
 * # cdcstates
 * Service in the flunearyouV2App.
 */

app.service('cdcstates', ['$http', function ($http) {

  var obj = {};
  var states = [];

  obj.getStates = function (callback) {
    $http.get('../assets/states.geo.json').success(function (data) {
      states = data;
      callback(data);
    }).error(function (error) {
      console.log('Error getStates: ', error);
    });
  };

  obj.getMarkers = function (callback) {
    $http.get('https://flunearyou.org/home.json').success(function (data) {
      states = data;
      callback(data);
    }).error(function (error) {
      console.log('Error getMarkers: ', error);
    });
  };

  return obj;
}]);
//# sourceMappingURL=cdcstates.js.map

'use strict';

app.service('reportApi', ['$http', '$urlBase', '$rootScope', '$window', '$timeout', '$uibModal', function ($http, $urlBase, $rootScope, $window, $timeout, $uibModal) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token;
    } else {
        token = '';
    }

    obj.getChecks = function (callback) {
        $http.get($urlBase + '/checks.json', { headers: { 'token': token } }).success(function (data) {
            callback(data);
        }).error(function (error) {
            console.log('Error getChecks: ', error);
        });
    };

    obj.getReportsThisWeek = function (callback) {
        $http.get($urlBase + '/reports-this-week.json', { headers: { 'token': token } }).success(function (data) {
            callback(data);
        }).error(function (error) {
            console.log('Error getReportsThisWeek: ', error);
        });
    };

    obj.everyoneHealthy = function (callback) {
        $http.post($urlBase + '/survey/all', {}, { headers: { 'token': token } }).success(function (data) {
            callback(true);
        }).error(function (error) {
            console.log('Error getUser: ', error);
        });
    };

    obj.sendReport = function (survey, user_id, current_user_id, members, realtime, callback) {
        var url = realtime ? $urlBase + '/survey/now' : $urlBase + '/survey/new';
        var no_symptoms = survey.symptoms.length == 0 ? 1 : 0;

        var data = {
            'platform': 'web',
            'user_id': user_id,
            'current_member': current_user_id,
            'healthy_members': members.join()
        };

        if (no_symptoms == 1) {
            data.no_symptoms = no_symptoms;
        }

        if (survey.ill_date) {
            data.ill_date = new Date(survey.ill_date).toISOString().substring(0, 10);
        }

        if (survey.was_traveling) {
            data.traveling = 'Y';
            data.travel_where = survey.travel_where;
        }

        angular.forEach(survey.medical, function (value, key) {
            data[key] = 'Y';
        });

        angular.forEach(survey.symptoms, function (value, key) {
            data[value] = 1;
        });

        $http.post(url, data, { headers: { 'token': token } }).success(function (data) {
            callback(true);
        }).error(function (error) {
            console.log('Error sendReport: ', error);
        });
    };

    obj.sendVaccine = function (data, callback) {
        data.token = token;

        $http.post($urlBase + '/survey/vaccine', data, { headers: { 'token': token } }).success(function (data) {
            callback(true);
        }).error(function (error) {
            console.log('Error sendVaccine: ', error);
        });
    };

    obj.sendReminder = function (callback) {
        $http.post($urlBase + '/user/reminder/disable', {}, { headers: { 'token': token } }).success(function (data) {
            callback(true);
        }).error(function (error) {
            console.log('Error sendReminder: ', error);
        });
    };

    return obj;
}]);
//# sourceMappingURL=reportApi.js.map

/*
*
*/

'use strict';

app.service('$fny', ['$http', '$urlBase', '$rootScope', '$window', '$timeout', function ($http, $urlBase, $rootScope, $window, $timeout) {

	var request = {
		login: function login(loginObj) {
			$http.post($urlBase + '/user/login', loginObj).success(function (data, status) {

				var user = data.info.basic,
				    userToken = data.info.basic.token,
				    userLoggedObj = {
					'name': user.nickname,
					'email': user.email,
					'token': user.token
				};

				localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
				$rootScope.$emit("IS_LOGGED");
				$window.location.href = '#/report?token=' + userToken;
			}).error(function (data, status) {
				console.log(status);
			});
		},

		loginByToken: function loginByToken(token) {
			$http.get($urlBase + '/user', { headers: { 'token': token } }).success(function (data, status) {
				var nickname = data.info.basic.nickname,
				    userToken = data.info.basic.token,
				    userEmail = data.info.basic.email,
				    userLoggedObj = {
					'name': nickname,
					'email': userEmail,
					'token': userToken
				};

				localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
				$rootScope.$emit("IS_LOGGED");
				$window.location.href = '#/report?token=' + userToken;
			}).error(function (data, status) {
				console.log(status);
			});
		},

		registerNewUser: function registerNewUser(objNewUser) {
			var campaign = localStorage.getItem('campaign');
			if (campaign) {
				objNewUser.apha_num = campaign;
			}
			$http.post($urlBase + '/user', objNewUser).success(function (data, status) {
				var loginObj = {
					"email": objNewUser.email,
					"password": objNewUser.password
				};

				request.login(loginObj);
			}).error(function (data, status) {
				console.log(data);console.log(status);
			});
		}
	};

	return request;
}]);
//# sourceMappingURL=fny-requests.js.map

'use strict';

app.service('userApi', ['$http', '$urlBase', '$rootScope', '$window', '$timeout', function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token;
    } else {
        token = '';
    }

    obj.getUser = function (callback) {
        if (JSON.parse(localStorage.getItem('userLogged')).token) {
            $http.get($urlBase + '/user', { headers: { 'token': JSON.parse(localStorage.getItem('userLogged')).token } }).success(function (data) {
                callback(data);
            }).error(function (error) {
                console.log('Error getUser: ', error);
            });
        }
    };

    obj.userEdit = function (user, callback) {
        var data = { nickname: user.nickname, email: user.email, gender: user.gender, zip: user.zip, birthmonth: user.birthmonth, birthyear: user.birthyear };
        $http.post($urlBase + '/user/update', data, { headers: { 'token': token } }).success(function (data) {
            callback(data);
        }).error(function (error) {
            console.log('Error userEdit: ', error);
        });
    };

    obj.sendPassword = function (data, callback) {
        $http.post($urlBase + '/user/update/password', data, { headers: { 'token': token } }).success(function (data) {
            callback(data);
        }).error(function (error) {
            console.log('Error sendPassword: ', error);
        });
    };

    return obj;
}]);
//# sourceMappingURL=userApi.js.map

'use strict';

app.service('householdApi', ['$http', '$urlBase', '$rootScope', '$window', '$timeout', function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token;
    } else {
        token = '';
    }

    obj.getHuseholds = function (callback) {
        if (token) {
            $http.get($urlBase + '/user/household', { headers: { 'token': token } }).success(function (data) {
                callback(data);
            }).error(function (error) {
                console.log('Error getHuseholds: ', error);
            });
        }
    };

    obj.sendActivation = function (household, callback) {
        var action = household.active == 'Y' ? 'deactivate' : 'activate';

        $http.post($urlBase + '/user/household/' + action, { user_household_id: household.user_household_id }, { headers: { 'token': token } }).success(function (data) {
            callback(data);
        }).error(function (error) {
            console.log('Error sendActivate: ', error);
        });
    };

    obj.sendHouseholdEdit = function (household, callback) {
        var data = { nickname: household.nickname, gender: household.gender, user_household_id: household.user_household_id, birthyear: household.birthyear, birthmonth: household.birthmonth };
        $http.post($urlBase + '/user/household/update', data, { headers: { 'token': token } }).success(function (data, status) {
            callback(data);
        }).error(function (data, status) {
            console.log('Error sendHouseholdEdit: ', error);
        });
    };

    obj.sendNewHousehold = function (household, callback) {
        $http.post($urlBase + '/user/household', household, { headers: { 'token': token } }).success(function (data, status) {
            callback(data);
        }).error(function (data, status) {
            console.log('Error sendNewHousehold: ', error);
        });
    };

    return obj;
}]);
//# sourceMappingURL=householdApi.js.map
