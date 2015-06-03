// ==========================================
// Login
// ==========================================

var APP = APP || {};
APP.Login = {
  setUp: function() {

  },

  fny: function() {
    var endpoint = "user/login";
    $("#login-submit").click(function (e) {
    $("#password").rules("add", {required: true});
    });
    $("#forgot-pw").click(function (e) {
    e.preventDefault();
    endpoint = "user/reset_password";
    $("#password").rules("remove");
    $("#login-form").submit();
    });

    $("#login-form").validate({
    ignore: '',
    rules: {
    email: {
    validEmail: true
    },
    password: "required"
    },
    errorClass: "survey-error",
    errorElement: "div",
    errorPlacement: function (error, element) {
    error.insertAfter(element);
    },
    invalidHandler: function (event, validator) {
    // login error message:
    $('.modal-login').addClass('js-form-error');
    setTimeout(function() {
    $('.modal-login').removeClass('js-form-error');
    }, 1000);

    $(validator.lastActive).focus().toggleClass('js-input-error');
    },
    submitHandler: function () {
    // Serialize form:
    var formData = $('#login-form').serializeObject();
    var query = jQuery.param(formData);
    // Make button disabled:
    $("#login-submit").prop("disabled", true);
    blockUI(i18nJS_processing);
    // On success:
    $.ajax({
    url: endpoint,
    headers: {
    "auth-token": 1
    },
    data: query,
    type: 'post',
    error: function (data, XMLHttpRequest, textStatus, errorThrown) {
    //console.log("signup : error", data);
    $("#login-submit").prop("disabled", false);
    if (data.responseJSON) {
    $('#login-error-message').text(data.responseJSON.message);
    } else {
    $('#login-error-message').text(i18nJS_error_login);
    }
    $('#login-error').show();
    },
    success: function (data) {
    //console.log("signup : success", data);
    $("#login-submit").prop("disabled", false);
    if (data.status == 200) {
    $('#login-error').hide();
    if(endpoint == "user/reset_password") {
    $('#login-status-message').text(app.passwordRecoveryText);
    $('#login-status').show();
    // toastr.success(data.message);
    } else {
    toastr.success(data.message + i18nJS_redirecting);
    close_modal();
    redirectUser(data.info.basic.current_survey, data.info.basic.token);
    }
    } else {
    $('#login-error-message').text(data.message);
    $('#login-error').show();
    }
    endpoint = "user/login";
    }
    });
    }
    });

    $("#facebook-login").on("click", function () {
    if (typeof FB != 'undefined') {
    $("#facebook-login").prop("disabled", true);
    FB.login(function (response) {
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
    toastr.success(result.message + "Redirecting...");
    close_modal();
    redirectUser(result.info.basic.current_survey, result.info.basic.token);
    } else {
    toastr['warning'](data.message);
    }
    },
    error: function (data, XMLHttpRequest, textStatus, errorThrown) {
    toastr['warning'](data.message);
    $("#google-plus-login").prop("disabled", false);
    }
    }).retry({times: 3});
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
    $("#google-plus-login").on("click", function () {
    $("#google-plus-login").prop("disabled", true);
    var additionalParams = {
    'callback': loginCallback,
    'scope': 'https://www.googleapis.com/auth/plus.profile.emails.read',
    'response_type': 'code'
    };
    gapi.auth.signIn(additionalParams); // Will use page level configuration
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
    redirectUser(result.info.basic.current_survey, result.info.basic.token);
    } else {
    toastr['warning'](data.message);
    }
    },
    error: function (data, XMLHttpRequest, textStatus, errorThrown) {
    toastr['warning'](data.message);
    $("#google-plus-login").prop("disabled", false);
    }
    }).retry({times: 3});
    } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
    }
    }
    });
  }
}
