/*
*	Modals Controller
*/

'use strict';

app.controller('modalsCtrl', ['$scope', '$rootScope', '$http', '$urlBase', '$window', '$fny', 'Facebook', 'GooglePlus',
	function($scope, $rootScope, $http, $urlBase, $window, $fny, Facebook, GooglePlus){

	/*
	*	Init
	*/
	$scope.newUser = {};
	$scope.resgisterSocial = true;
	$scope.toggleResgisterSocial = function(redeSocial){
		if (redeSocial == 'FB') {
			Facebook.login(function(response) {
				if (response.status == 'connected') {
					$scope.showRegisterForm = true;
					$scope.registerFacebook();
				}
			});
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
	*	Login
	*/ 
	$scope.login = function(email, pass, event){
		var loginObj = {
			"email"     : email,
			"password"  : pass
		}
		
		$fny.login(loginObj);
	};

	$scope.checkIfEnterKeyWasPressed = function(email, pass, event){
		if (event.keyCode == 13) {
			$scope.login(email, pass, event);
		}
	}

	/*
	*	Login by Facebook
	*/ 
	$scope.loginFacebook = function(){
		Facebook.login(function(response) {
			if (response.status == 'connected') {
				var token = response.authResponse.accessToken;
                $http.post($urlBase+'/user/login/facebook', {"access_token": token}).success(function(data, status, result){
                	console.log('loginFacebook');
                	console.log(data);
                	console.log(status);
                	console.log(result);

                	if (status == 200){
                		var nickname  = data.info.basic.nickname,
			                userToken = data.info.basic.token,
			                userEmail = data.info.basic.email,
			                userLoggedObj = {
			                    'name'  : nickname,
			                    'email' : userEmail,
			                    'token' : userToken
			                };

                		localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
                		$rootScope.$emit("IS_LOGGED");
                		$('.modal').modal('hide');
                	}
                }).error(function(data, status, result){
                	
                });
            }
		}, {scope: 'email'});
	} 

	/*
	*	Login by Google Plus
	*/
	 $scope.loginGooglePlus = function () {

        GooglePlus.login().then(function (authResult) {
            if (authResult.status.google_logged_in == true) {
            	var token = authResult.access_token;

            	$http.post($urlBase+'/user/login/googleplus', {"access_token": token}).success(function(data, status, result){
                	if (status == 200){
                		var tokenUser = data.info.basic.token;
                		$fny.loginByToken(tokenUser);
                	}
                }).error(function(data, status, result){
                	
                });
            }
        }, function (err) {
            console.log(err);
        });
    }; 

	
	/*
	*	Register new user	
	*/ 
	$scope.sendNewUser = function(){
		var objNewUser = $scope.newUser
		
		if(objNewUser.gender == undefined){
			$scope.isGenderValid = false;
			$scope.errorMsg = 'Gender is empty';
		}else{
			$fny.registerNewUser(objNewUser)
		}
		return false;
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

	
	/*
	*
	*	Validation form
	*
	*/ 
	$scope.isEmailValid  = true;
	$scope.isZipEmpty	 = true;
	$scope.isPassEmpty	 = true; 
	$scope.isYearEmpty	 = true;
	$scope.isGenderValid = true;

	$scope.validaEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.isEmailValid = re.test(email);
        $scope.errorMsg = 'Email invalid'
        return $scope.isEmailValid
    }

    $scope.passEmpty = function(pass){
    	if(pass == '' || pass == undefined || pass == null || pass.length < 3 || pass.length > 12 ){
    		$scope.isPassEmpty	= false;
    		$scope.errorMsg = 'Password must have bettwen 3 and 12 caracters' 
    	}else{
    		$scope.isPassEmpty	= true;
    	}
    }

    $scope.zipEmpty = function(val){
    	
    	var zip = String(val);

    	if(zip == '' || zip == undefined || zip == null || zip.length < 5 || zip.length > 5){
    		$scope.errorMsg = 'Zip code must have 5 characters' 
    		$scope.isZipEmpty	= false;
    	}else{
    		$scope.isZipEmpty	= true;
    	}
    };

    $scope.yearEmpty = function(val){
    	
    	var year = String(val);

    	if(year == '' || year == undefined || year == null || year.length < 4 || year.length > 4){
    		$scope.errorMsg = 'Year must have 4 characters'
    		$scope.isYearEmpty	= false; 
    	}else{
    		$scope.isYearEmpty	= true;
    	}
    };
}]); 