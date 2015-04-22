$("#google-plus-register").on("click", function () {
    var additionalParams = {
        'callback': signinCallback,
        'scope': 'https://www.googleapis.com/auth/plus.profile.emails.read',
        'response_type': 'code'
    };

    gapi.auth.signIn(additionalParams); // Will use page level configuration
});

function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized, for example:
        console.log(authResult);
        var token;
        $('.modal-zip').css('zIndex', '9');
        $('.modal-zip').css('opacity', '1');
        $('.card').addClass('flipped');

        $('#bt-zip').on('click', function (event) {
            var retorno = $('#input-modal-zip').val();
            console.log("submit", retorno);
            $('card').removeClass('flipped');
            $('.modal-zip').css('zIndex', '-1');
            $('.modal-zip').css('opacity', '0');
            // bootbox.prompt("What's your zip address?", function (result) {
            blockUI(i18nJS_processing);
            token = authResult.access_token;
//          console.log("token", token);
            var query = { 'access_token': token, zip: retorno, platform: "web" };
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
//              console.log("facebook result", data);
                    if (data.user_status == "existing") {
                        redirectUser(data.info.basic.current_survey, data.info.basic.token);
                    } else if (data.user_status == 'pending') {
                        /*--- BEGIN NANIGANS SUBMIT TRACKING ---*/
                        if (data.token) {
                            $.ajax({type: "GET", url: "//api.nanigans.com/event.php?app_id=157283&s2s=1&type=install&name=emailsubmit&nan_pid=" + data.token + "&user_id=" + data.token});
                        }
                        /*--- END NANIGANS SUBMIT TRACKING ---*/
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
                        toastr['warning'](data.message);
                        $("#google-plus-register").prop("disabled", false);
                    }
                }
            }).retry({times: 3});
        });
    } else {
        // Update the app to reflect a signed out user
        // Possible error values:
        //   "user_signed_out" - User is signed-out
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatically log in the user
        console.log('Sign-in state: ' + authResult['error']);
    }
}
