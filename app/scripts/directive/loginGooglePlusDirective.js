/*
*	Login google plus directive
*/

'use strict';

app.directive('loginGooglePlus', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){

			function loginCallback(authResult) {
	            if (authResult['status']['signed_in']) {
	                token = authResult.access_token;
	                blockUI(i18nJS_processing);
	                $.ajax({
	                    url: "user/login/googleplus",
	                    headers: {
	                        "auth-token": 1
	                    },
	                    data: {
	                        "access_token": token
	                    },
	                    type: 'post',
	                    success: function (result) {
	                        if (result.status == 200) {
	                            $('#login-error').hide();
	                            toastr.success(result.message + "Redirecting...");
	                            close_modal();
	                            redirectUser(result.info.basic.current_survey, result.info.basic.token, 'login');
	                        } else {
	                            toastr['warning'](result.message);
	                        }
	                    },
	                    error: function (data, XMLHttpRequest, textStatus, errorThrown) {
	                        toastr['warning'](data.message);
	                        $("#google-plus-login").prop("disabled", false);
	                    }
	                }).retry({times: 1});
	            } else {
	                console.log('loginCallback() - error')
	            }
	        }

			elem.on('click', function(){
				$("#google-plus-login").prop("disabled", true);
		        
		        var additionalParams = {
		            'callback': loginCallback,
		            'scope': 'https://www.googleapis.com/auth/plus.profile.emails.read',
		            'response_type': 'code'
		        };
		        gapi.auth.signIn(additionalParams); // Will use page level configuration
			});
		}
	}
}); 