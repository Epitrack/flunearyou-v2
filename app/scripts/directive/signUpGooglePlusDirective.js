/*
*	Singup google plus directive
*/

'use strict';

app.directive('singUpGooglePlus', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){

			function doGoogleRegistration(authResult) {
			    var retorno = $('#input-modal-zip').val();
			    var token = authResult.access_token;
			    var query = {'access_token': token, zip: retorno, platform: "web"};
			    var apha_num = getUrlParam("campaign");
			    if (apha_num) {
			        query.apha_num = apha_num;
			    }
			    if (app.ncmrc == "1") {
			        query.ncmrc = app.ncmrc;
			    }
			    $.ajax({
			        url: "user/googleplus",
			        headers: {
			            "auth-token": 1
			        },
			        data: query,
			        type: 'post',
			        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
			            toastr['warning'](data.message);
			            $("#google-plus-register").prop("disabled", false);
			        },
			        success: function (data) {
			            if (data.user_status == "existing") {
			                redirectUser(data.info.basic.current_survey, data.info.basic.token, 'signup');
			            } else if (data.user_status == 'pending') {
			                bootbox.dialog({
			                    message: app.registration_next_step,
			                    title: app.thanks_for_reg,
			                    buttons: {
			                        success: {
			                            label: "Ok!",
			                            className: "btn-success"
			                        }
			                    }
			                });
			            } else {
			                toastr['warning'](data.message);
			                $("#google-plus-register").prop("disabled", false);
			            }
			        }
			    }).retry({times: 3});
			}

			function signinCallback(authResult) {
			    if (authResult['status']['signed_in']) {
			    } else {
			    }
			}

			elem.on('click', function(){
			    var additionalParams = {
			        'callback': signinCallback,
			        'scope': 'https://www.googleapis.com/auth/plus.profile.emails.read',
			        'response_type': 'code'
			    };

			    gapi.auth.signIn(additionalParams); // Will use page level configuration
			});
		}
	}
}); 