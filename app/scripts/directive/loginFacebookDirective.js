/*
*   Login Facebook
*/

'use strict';

app.directive('loginFacebook', function(){
    return {
    restrict : 'A',
        link: function(scope, elem){
            elem.on('click', function(){
                if (typeof FB != 'undefined') {
                $("#facebook-login").prop("disabled", true);
                    FB.login(function (response) {
                        console.log(response);
                        if (response.status === 'connected') {
                            // Logged into your app and Facebook.
                            var token = response.authResponse.accessToken;
                            blockUI(i18nJS_processing);
                            $.ajax({
                                url: "user/login/facebook",
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
                                        console.log("result", result);
                                        toastr.success(result.message + "Redirecting...");
                                        close_modal();
                                        redirectUser(result.info.basic.current_survey, result.info.basic.token, 'login');
                                    } else {
                                        ////console.log("fb login status", result);
                                        toastr['warning'](result.message);
                                    }
                                },
                                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                                    ////console.log("fb login error");
                                    toastr['warning'](data.message.message);
                                    $("#google-plus-login").prop("disabled", false);
                                }
                            }).retry({times: 1});
                        } else if (response.status === 'not_authorized') {
                            // The person is logged into Facebook, but not your app.
                            alert('Please authorize Facebook - and try again!');
                        } else {
                            // The person is not logged into Facebook, so we're not sure if
                            // they are logged into this app or not.
                            alert('Unknown error occurred - please try again.');
                        }
                    }, {scope: 'email'});
                }
            });
        }
    }
}); 
