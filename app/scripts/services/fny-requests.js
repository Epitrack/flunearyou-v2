/*
*
*/

'use strict';

app.service('$fny', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', 
    function ($http, $urlBase, $rootScope, $window, $timeout){
	
	var request = {
		login : function(loginObj){
	        $http.post($urlBase+'/user/login', loginObj).success(function(data, status){
	            
	            var user          = data.info.basic,
	                userToken     = data.info.basic.token,
	                userLoggedObj = {
	                    'name'  : user.nickname,
	                    'email' : user.email,
	                    'token' : user.token
	                };
	                
		            localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
		            $rootScope.$emit("IS_LOGGED");
		            $window.location.href = '#/report?token='+userToken;

	        }).error(function(data, status){ console.log(status) });
	    },

	    registerNewUser : function(objNewUser){
	    	var campaign = localStorage.getItem('campaign');
	    	if (campaign){
	    		objNewUser.apha_num = campaign;
	    	}
	        $http.post($urlBase+'/user', objNewUser).success(function(data, status){
	            var loginObj = {
	                	"email"     : objNewUser.email,
	                	"password"  : objNewUser.password
	            	}

	            	request.login(loginObj);

	        }).error(function(data, status){ console.log(data); console.log(status); });
	    }
	}

    return request;
}]);