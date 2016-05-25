/*
*	Setting Controller
*/

'use strict';

app.controller('settingCtrl', ['$scope', '$http', '$urlBase', '$timeout', '$rootScope','$route',  function($scope, $http, $urlBase, $timeout, $rootScope, $route){
	
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");
	$scope.showUserUpdate = false;

	/*
	*	Get user account
	*/ 
	if (localStorage.getItem('userLogged')){
		var user  = JSON.parse(localStorage.getItem('userLogged')),
			token = user.token;
	}else{
		return false;
	}

	$http.get($urlBase+'/user', {headers: {'token': token}}).success(function(data){
		// console.log(data);
		// 
		$scope.email      = data.info.basic.email;
		$scope.nick       = data.info.basic.nickname;
		$scope.birthdate  = data.info.basic.dob;
		$scope.sex        = data.info.basic.gender;
		$scope.zip        = data.info.place.zip;
		$scope.households = data.info.household;
		$scope.place_id   = data.info.basic.place_id;
		

		// Get month and year birthdate
		var index = $scope.birthdate.indexOf('/'),
			year  = $scope.birthdate.slice(index+1),
			month = $scope.birthdate.slice(0,index);

		$scope.year  = year;
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

		$http.post($urlBase+'/user/update/password', objPass, {headers: {'token': token}}).success(function(data){
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


		$http.post($urlBase+'/user/update', objUserEdited, {headers: {'token': token}}).success(function(data, status){
			
			$scope.msgSuccessUserUpdate = true;
			$timeout(function(){
				$scope.msgSuccessUserUpdate = false;
				$scope.showUserUpdate = false;
			}, 2000);
			
			$route.reload();
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
	*	ADD NEW HOUSEHOLD MEMBER
	*/
	$scope.sendNewHousehold = function(newHousehold, genderHousehold, yearNewHousehold){
		var month = $('#birthdate-household-member').val();

		var objNewHousehold = {
			'nickname' : newHousehold,
			'gender' : genderHousehold,
			'birthmonth' : month,
			'birthyear' : yearNewHousehold	
		};

		$http.post($urlBase+'/user/household', objNewHousehold, {headers: {'token': token}}).success(function(data, status){
			
			$scope.msgSuccessUserHousehold = true;
			$timeout(function(){
				$scope.msgSuccessUserHousehold = false;
				$scope.addMember = false;
			}, 2000)

			$route.reload();
		}).error(function(data, status){
			console.log(data);
			console.log(status);
		});
	};



	/*
	*	Fill Form Edit Household Membres
	*/ 
	$scope.updateHousehold = function(){
		$scope.$apply();
		$scope.objHouseholdEdit = JSON.parse(localStorage.getItem('objHouseholdEdit'));	

		if($scope.objHouseholdEdit.gender == 'M'){
			$scope.maleEdit = true
			$scope.femaleEdit = false
		}else{
			$scope.maleEdit = false
			$scope.femaleEdit = true
		}

		// Fill form edit
		var index = $scope.objHouseholdEdit.niver.indexOf('/'),
			year  = $scope.objHouseholdEdit.niver.slice(index+1),
			month = $scope.objHouseholdEdit.niver.slice(0,index);	

			$scope.nicknameEdit  = $scope.objHouseholdEdit.nickname;
			$scope.birthyearEdit = year;
			$scope.monthEdit     = month;
			$('#birthdate-household-member').find('option[value="'+ month +'"]').attr('selected', true);
			$route.reload()	
	};

	$rootScope.$on('updateHousehold', $scope.updateHousehold);


	
	/*
	*	Send Household Membres Edited
	*/ 
	$scope.sendHouseholdEdited = function(nickname, genderEdit, birthyear){
		
		var id    = parseInt(JSON.parse(localStorage.getItem('objHouseholdEdit')).id);
		var month = $('#birthdate-household-member').val();

		if(genderEdit){
			var gender = genderEdit
		}else if(JSON.parse(localStorage.getItem('objHouseholdEdit')).gender == 'M'){
			var gender = 'M'
		}else{
			var gender = 'F'
		}
		
		$scope.householdEdited = {
			'user_household_id' : id,
			'nickname'          : nickname,
			'gender'            : gender,
			'birthmonth'        : month,
			'birthyear'         : birthyear		
		};

		$http.post($urlBase+'/user/household/update', $scope.householdEdited, {headers: {'token': token}}).success(function(data, status){
			$scope.msgSuccessUserHousehold = true;
			$timeout(function(){
				$scope.msgSuccessUserHousehold = false;
				$('.modal').modal('hide');
			}, 500);
			$route.reload()
		}).error(function(data, status){
			console.log(data);
		})
	}


	/*
	*
	*/
	$scope.flag = 'deactivate'
	$scope.deactivateFunction = function(active, id){
		if (active != 'Y') {
			$scope.flag = 'activate'
		};
		localStorage.setItem('user_household_id', id);
	};

	$scope.sendDeactivate = function(flag){
		var user  = JSON.parse(localStorage.getItem('userLogged')),
			token = user.token;

		var id = parseInt(localStorage.getItem('user_household_id'));

		 if(flag == 'deactivate'){
			$http.post($urlBase+'/user/household/deactivate', {user_household_id: id}, {headers: {'token': token}}).success(function(data){
				$('.modal').modal('hide');
				$route.reload()
			});
		}else{
			$http.post($urlBase+'/user/household/activate', {user_household_id: id}, {headers: {'token': token}}).success(function(data){
				console.log(data)
			})
		};
	}

}]);