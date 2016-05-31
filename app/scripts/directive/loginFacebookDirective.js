/*
*   Login Facebook
*/

'use strict';

app.directive('loginFacebook', function(){
    return {
    restrict : 'A',
        link: function(scope, elem){
            elem.on('click', function(){

                var fbAppId = "199700630106025";
                // Facebook Login/Signup JS:
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: fbAppId,
                        xfbml: true,
                        status : true,
                        version: 'v2.1'
                    });
                };


                if (typeof FB != 'undefined') {
                $("#facebook-login").prop("disabled", true);
                    FB.login(function (response) {
                        if (response.status === 'connected') {
                            // Logged into your app and Facebook.
                            var token = response.authResponse.accessToken;
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
                                        redirectUser(result.info.basic.current_survey, result.info.basic.token, 'login');
                                    } else {
                                        console.log("fb login status", result);
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
