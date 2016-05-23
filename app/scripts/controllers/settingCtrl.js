/*
*	Setting Controller
*/

'use strict';

app.controller('settingCtrl', ['$scope', '$http', '$urlBase', '$timeout', '$rootScope', function($scope, $http, $urlBase, $timeout, $rootScope){
	
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");

	/*
	*	Get user account
	*/ 
	var user  = JSON.parse(localStorage.getItem('userLogged')),
		token = user.token;

	$http.get($urlBase+'/user?t='+token).success(function(data){

		// 
		$scope.email      = data.info.basic.email;
		$scope.nick       = data.info.basic.nickname;
		$scope.birthdate  = data.info.basic.dob;
		$scope.sex        = data.info.basic.gender;
		$scope.zip        = data.info.place.zip;
		$scope.households = data.info.household;
		
		// Get month and year birthdate
		var index = $scope.birthdate.indexOf('/'),
			year  = $scope.birthdate.slice(index+1),
			month = $scope.birthdate.slice(0,index);

		$scope.year      = year;
		$('#month').find('option[value="'+ month +'"]').attr('selected', true);	

		// Check radio gender
		if($scope.sex == 'M'){
			$scope.male = true
			$scope.female = false
		}else{
			$scope.male = false
			$scope.female = true
		}
	});


	/*
	*	Change password
	*/ 
	$scope.emptyValid = function(val){
		if (!val){
			$scope.msgErrorChangePass = 'Field empty'
		}else{
			$scope.msgErrorChangePass = ''
		}
	}

	$scope.sendPass = function(currentPass, newPass, confirmPass){
		var objPass = {
			'old_password'     : currentPass,
			'password'         : newPass,
			'confirm_password' : confirmPass
		};

		$http.post($urlBase+'/user/update/password?t='+token, objPass).success(function(data){
			$scope.msgSuccessChangePass = true;

			$timeout(function(){
				$scope.msgSuccessChangePass = false;
				$scope.changePass = false;
			}, 1000)
		});
	};


	/*
	*	Validation Edit user accout
	*/
	$scope.validaEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.isEmailValid = re.test(email);
    
        if ($scope.isEmailValid){
        	$scope.errorEdit = ''	
        }else{
        	$scope.errorEdit = 'Email invalid'
        }

        return $scope.isEmailValid
    }

    $scope.emptyValidEdit = function(val){
		if (!val){
			$scope.errorEdit = 'Field empty'
		}else{
			$scope.errorEdit = ''
		}
	}

	/*
	*	Send user accout updated
	*/
	$scope.userEdit = function(email,nick,year,zip, birthmonth){
		var sex, month;

		if($scope.male){
			sex = 'M'
		}else{
			sex = 'F'
		};

		month = $('#month').val();

		var objUserEdited = {
			'email'      : email,
			'nickname'   : nick,
			'birthmonth' : month,
			'birthyear'  : year,
			'gender'     : sex,
			'zip'        : zip
		} 

		$http.post($urlBase+'/user/update?t='+token, objUserEdited).success(function(data, status){
			$scope.$apply();
			$scope.msgSuccessUserUpdate = true;
			$timeout(function(){
				$scope.msgSuccessUserUpdate = false;
				$scope.showUserUpdate = false;
			}, 2000)
		}).error(function(data, status){
			console.log(data);
			console.log(status);
		});
	};

	// Choose Gender
	$scope.chooseGender = function(sex){
		if(sex == 'M'){
			$scope.male = true
			$scope.female = false
		}else{
			$scope.male = false
			$scope.female = true
		}
	} 

	/*
	*	Add household member
	*/
	$scope.sendNewHousehold = function(newHousehold, genderHousehold, yearNewHousehold){
		var month = $('#birthdate-household-member').val();

		var objNewHousehold = {
			'nickname' : newHousehold,
			'gender' : genderHousehold,
			'birthmonth' : month,
			'birthyear' : yearNewHousehold	
		};

		$http.post($urlBase+'/user/household?t='+token, objNewHousehold).success(function(data, status){
			
			$scope.msgSuccessUserHousehold = true;
			$timeout(function(){
				$scope.msgSuccessUserHousehold = false;
				$scope.addMember = false;
			}, 2000)

			if(!$scope.$$phase) {
				$scope.$apply()
			}
			

		}).error(function(data, status){
			console.log(data);
			console.log(status);
		});
	}

	








}]);