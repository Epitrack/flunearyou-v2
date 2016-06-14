/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('landingCtrl', ['$scope', '$rootScope','$http', '$urlBase','$window', 'session', 'Facebook', 'GooglePlus',
	function($scope, $rootScope, $http, $urlBase, $window, session, Facebook, GooglePlus){
	session.then( function() {
	/*
	*	Init
	*/ 
	if (localStorage.getItem('userLogged')){
		$window.location.href = '#/map'
	}

	$scope.isLogged = function(){
		var userLogged = localStorage.getItem('userLogged');
		if(userLogged){
			$('.btn-cta').addClass('none');
		}else{
			$('.btn-cta').removeClass('none');
		};
	};
	$rootScope.$on("IS_LOGGED", $scope.isLogged);

	// ScrollTop all pages
	$scope.scrolltop = function(){
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
	$scope.mapZipCode = function(zip){
		sessionStorage.setItem('zip', zip);
		$window.location.href = '#/map';
	};

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

	/*
	*	Login Social
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.newUser = {};
	$scope.resgisterSocial = true;
	$scope.toggleResgisterSocial = function(redeSocial){
		if (redeSocial == 'FB') {
			Facebook.login(function(response) {
				if (response.status == 'connected') {
					$scope.showRegisterForm = true;
					$scope.registerFacebook();
				}
			}, {scope: 'email'});
		}else{
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
	$scope.registerFacebook = function(zip){
		var zipCode = zip;

		Facebook.api('/me', function(response) {
			$scope.newUser.email = response.email;
			if (response.gender == 'male') {
				$scope.newUser.gender = 'M'
			}else{
				$scope.newUser.gender = 'F'
			}
		});
	}



	/*
	*	Register by FB
	*/ 
	$scope.registerGooglePlus = function(authResult){
    	var token = authResult.access_token;

    	$http.post($urlBase+'/user/login/googleplus', {"access_token": token}).success(function(data, status, result){
        	if (status == 200){
        		console.log(data);
        		$scope.newUser.email  = data.info.basic.email;
        		$scope.newUser.gender = data.info.basic.gender
        	}
        }).error(function(data, status, result){
        	
        });
	}  
}]);
