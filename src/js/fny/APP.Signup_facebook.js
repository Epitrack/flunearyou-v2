var token;
$("#facebook-register").on("click", function () {
    if (typeof FB != 'undefined') {
        $("#facebook-register").prop("disabled", true);
        FB.login(function (response) {
            if (response.status === 'connected') {
                $('.modal-zip').css('zIndex', '9');
                $('.modal-zip').css('opacity', '1');
                $('.card').addClass('flipped');

                $('#bt-zip').on('click', function (event) {
                    var retorno = $('#input-modal-zip').val();
                    console.log("submit", retorno);
                    $('card').removeClass('flipped');
                    $('.modal-zip').css('zIndex', '-1');
                    $('.modal-zip').css('opacity', '0');
                    // });
                    // bootbox.prompt("What's your zip address?", function (result) {
                    blockUI(i18nJS_processing);
                    token = response.authResponse.accessToken;
//          console.log("token", token);
                    var query = { 'access_token': token, zip: retorno, platform: "web" };
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
                                $('#registration-error-message').text(data.message);
                                $('#registration-error').show();
                                $("#facebook-register").prop("disabled", false);
                            }
                        }
                    }).retry({times: 3});
                }); //
            } else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                alert('Please authorize Facebook - and try again!');
            } else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into thOis app or not.
                alert('Unknown error occurred - please try again.');
            }
        }, {scope: 'email, user_birthday, user_location'});
    }
});
