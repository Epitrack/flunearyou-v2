/*
*	Report Controller
*/
'use strict';

app.controller('reportCtrl', ['$scope', '$route', '$rootScope', '$window', '$location', '$uibModal', 'reportApi', 'userApi', 'session', '$timeout',
	function($scope, $route, $rootScope, $window, $location, $uibModal, reportApi, userApi, session, $timeout){
	session.then( function() {

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
		$scope.survey = {symptoms: []};
		$scope.travel_where = null;
		$scope.checks = [];
		$scope.checks_perm = [];

		// Week of
		var d    = new Date();
		var day  = d.getDay(), 
			diff = d.getDate() - 7 - day + (day == 0 ? -6:1);

		$scope.week_of   = new Date(d.setDate(diff));
		$scope.week_end  = new Date(d.setDate(diff + 6));
		$scope.next_week = new Date(d.setDate(diff + 7));

		var openPage = function(page){
			$scope.page_members       = page == 'page_members' ? true : false;
			$scope.page_symptoms      = page == 'page_symptoms' ? true : false;
			$scope.page_vaccionations = page == 'page_vaccionations' ? true : false;
			$scope.page_more_members  = page == 'page_more_members' ? true : false;
		};


		var getUser = function(){
			
			userApi.getUser(function(result){
				console.log(result);
				if (result.info){
					$scope.user = result.info.basic;
					$scope.user_vaccionations = result.info.vaccinations;
					$scope.households = result.info.household;

					if ($scope.households.length >= 1){
						openPage('page_members');
					}else{
						openPage('page_symptoms');
						$scope.selected_ids = [$scope.user.user_id];
						$scope.current_id = $scope.user.user_id;
					}

					// console.log('User: ', $scope.user);
					// console.log('RTR: ', $scope.user.current_survey);

					var current_survey = $scope.user.current_survey,
						first_survey   = $scope.user.first_survey,
						has_symptoms   = $scope.user.has_symptoms;
					
					calender(result.info, current_survey, first_survey, has_symptoms);

					$scope.members_ids.push($scope.user.user_id);
					angular.forEach($scope.households, function(value, key){
						$scope.members_ids.push(value.user_household_id);
					});
				}
			});
		};

		// Show/Hide Calender
		var calender = function(info, current_survey, first_survey, has_symptoms){
			$scope.showUiCalender = false;

			var userCurrentSurvey = current_survey,
				userFirstSurvey   = first_survey,
				userHasSurvey     = has_symptoms;

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
		}

	
		$scope.termometro = true
		$scope.teste = function(){
			$scope.termometro = $scope.termometro === false ? true: false;
		}

		var getChecks = function(){
			reportApi.getChecks(function(result){
				// console.log(result);
				if (result){
					$scope.checks = result.checks;
					$scope.members = result.checks;
					$scope.checks_perm = result.checks_perm;
				}
			});
		};

		var getReportsThisWeek = function(){
			reportApi.getReportsThisWeek(function(result){
				if (result){
					$scope.reports_this_week = result;
				}
			});
		};

		var redirectToSuccess = function(){
			localStorage.setItem('redirectMap', true);			
			$location.path( "/map" );
		};

		var askForMembersOrGoHome = function(){
			if ($scope.households.length == 0 && $scope.user.more_members != 'N'){
				openPage('page_more_members');
			}else{
				redirectToSuccess();
			}
		}
		
		var successReport = function(){
			if (!$scope.user.current_survey && $scope.user_vaccionations.is_vaccinated != 'Y'){
				openPage('page_vaccionations');
			}else{
				askForMembersOrGoHome();
			}		
		};


		$scope.goBack = function(){
			openPage('page_members');
			getChecks();
		}

		$scope.everyoneHealthy = function(){
			reportApi.everyoneHealthy(function(result){
				if (result){
					successReport();
				}
			});
		};

		$scope.selectMembers = function(){
			if ($scope.members.length > 0){
				$scope.selected_ids = $scope.members.slice();
				$scope.openSymtoms();
			}else{
				$scope.error = 'You must select at least one member';
			}
		};

		$scope.openSymtoms = function(){
			if ($scope.members.length <= 0){
				successReport();
			}else{
				openPage('page_symptoms');
				$scope.current_id = $scope.members.shift();
				angular.forEach($scope.households, function(value, key){
					if (value.user_household_id == $scope.current_id){
						$scope.user_name = value.nickname;
					}
				});
			}
		};

		$scope.sendReport = function(){
			
			if ($scope.survey.symptoms.length == 0 && $scope.no_symptoms == false){
				$scope.error_symptom = true;
				return;
			}

			var index = $scope.members_ids.indexOf($scope.current_id);
	        if (index > -1) {
	            $scope.members_ids.splice(index, 1);
	        }
	        
			reportApi.sendReport($scope.survey, $scope.user.user_id, $scope.current_id, $scope.members_ids, $scope.user.current_survey, function(result){
				$scope.openSymtoms();
			});
		};

		$scope.sendVaccine = function(){
			if ($scope.vaccinations.user && $scope.vaccinations.user.hasOwnProperty($scope.user.user_id)){
				var data = {
					flu_vaccine: $scope.vaccinations.user[$scope.user.user_id],
					user_id:$scope.user.user_id,
					user_household_id: null
				}
				reportApi.sendVaccine(data, function(){});
			}
			if ($scope.vaccinations.user && $scope.vaccinations.user.hasOwnProperty($scope.user.user_id)){
				for (var id in $scope.vaccinations.household) {
			        if ($scope.vaccinations.household.hasOwnProperty(id)){
			        	data = {
							flu_vaccine: $scope.vaccinations.household[id],
							user_id:$scope.user.user_id,
							user_household_id: id
						}
						reportApi.sendVaccine(data, function(){});
			        }
			    }
			}
			askForMembersOrGoHome();
		};

		$scope.sendReminder = function(remind_me){
			if (remind_me == 'Y'){
				$location.path( "/settings" );
			}else if (remind_me == 'N'){
				reportApi.sendReminder(function(result){
					
					redirectToSuccess();
				});
			}else{
				
				redirectToSuccess();
			}
		};


		getUser();
		getChecks();
		getReportsThisWeek();
	});
}]) 