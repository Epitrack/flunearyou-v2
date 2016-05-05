/*
*   Signup Facebook
*/

'use strict';

app.directive('signupFacebook', function(){
	return {
		restrict : 'A',
		link: function(scope, elem){
			elem.on('click', function(){
				function doFacebookRegistration(response) {
				    var retorno = $('#input-modal-zip').val();
				    var token = response.authResponse.accessToken;
				    var query = {'access_token': token, zip: retorno, platform: "web"};
				    var apha_num = getUrlParam("campaign");
				    if (apha_num) {
				        query.apha_num = apha_num;
				    }
				    if (app.ncmrc == "1") {
				        query.ncmrc = app.ncmrc;
				    }
				    $.ajax({
				        url: "user/facebook",
				        headers: {
				            "auth-token": 1
				        },
				        data: query,
				        type: 'post',
				        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
				            $('#registration-error-message').text(data.message);
				            $('#registration-error').show();
				            $("#facebook-register").prop("disabled", false);
				        },
				        success: function (data) {
				            if (data.user_status == "existing") {
				                redirectUser(data.info.basic.current_survey, data.info.basic.token, 'signup');
				            } else if (data.user_status == 'pending') {
				                close_modal();
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
				                $('#registration-error-message').text(data.message);
				                $('#registration-error').show();
				                $("#facebook-register").prop("disabled", false);
				            }
				        }
				    }).retry({times: 3});
				}
				
				// if (typeof FB != 'undefined') {
			 //        $("#facebook-register").prop("disabled", true);
			 //        FB.login(function (response) {
			 //            console.warn(response);
			 //            if (response.status === 'connected') {
			 //                modalZipFlip("facebook", response);
			 //            } else if (response.status === 'not_authorized') {
			 //                // The person is logged into Facebook, but not your app.
			 //                alert('Please authorize Facebook - and try again!');
			 //            } else {
			 //                // The person is not logged into Facebook, so we're not sure if
			 //                // they are logged into thOis app or not.
			 //                alert('Unknown error occurred - please try again.');
			 //            }
			 //        }, {scope: 'email, user_birthday, user_location'});
			 //    }else{
			 //    	doFacebookRegistration(response)
			 //    }
			}
		}
	}
}); 
