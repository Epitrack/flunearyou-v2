// ==========================================
// Signup
// ==========================================

var APP = APP || {};
APP.Signup = {
  setUp: function() {},

  fny: function() {
    $("#registration-form").validate({
        ignore: '',
        rules: {
            email: {
                validEmail: true
            },
            birthmonth: {
                required: true,
                notEqual: 0
            },
            birthyear: {
                oldEnough: true,
                isAlive: true
            },
            gender: "required"
        },
        errorClass: "survey-error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element[0].name == "gender") {
                error.insertAfter($("#label_woman"));
            } else {
                error.insertAfter(element);
            }
        },
        invalidHandler: function (event, validator) {
            // Registration error message:
            $('#registration-error-message').text(i18nJS_error_form);
            $('#registration-error').show();
        },
        submitHandler: function () {
            // Serialize form:
            var formData = $('#registration-form').serializeObject();
            var query = jQuery.param(formData);
            if (app.ncmrc == "1") {
                query.ncmrc = app.ncmrc;
            }
            // Make button disabled:
            $("#registration-submit").prop("disabled", true);
            blockUI(i18nJS_processing);
            // On success:
            $.ajax({
                url: "user",
                headers: {
                    "auth-token": 1
                },
                data: query,
                type: 'post',
                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                    //console.log("signup : error", data);
                    $("#registration-submit").prop("disabled", false);
                    if (data.responseJSON) {
                        $('#registration-error-message').text(data.responseJSON.message);
                    } else {
                        $('#registration-error-message').text(i18nJS_error_account);
                    }
                    $('#registration-error').show();
                },
                success: function (data) {
                    /*--- BEGIN NANIGANS SUBMIT TRACKING ---*/
                    if (data.token) {
                        $.ajax({type: "GET", url: "//api.nanigans.com/event.php?app_id=157283&s2s=1&type=install&name=emailsubmit&nan_pid=" + data.token + "&user_id=" + data.token});
                    }
                    /*--- END NANIGANS SUBMIT TRACKING ---*/
                    //console.log("signup : success", data);
                    $("#registration-submit").prop("disabled", false);
                    if (data.status == 200) {
                        $('#registration-error').hide();
                        toastr.success(data.message);
                        blockUI(i18nJS_redirecting);
                        setTimeout(function () {
                            window.location.href = "survey";
                        }, 500);
                    } else {
                        $('#registration-error-message').text(data.message);
                        $('#registration-error').show();
                    }
                }
            });
        }
    });
  }
}
