/**
 * Created by guinetik on 3/9/15.
 */
$(function () {
    $("#unsub-form").validate({
        ignore: '',
        rules: {
            pauseoption:"required",
            reason: "required"
        },
        errorClass: "survey-error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        invalidHandler: function (event, validator) {
            $(validator.lastActive).focus().toggleClass('js-input-error');
        },
        submitHandler: function () {
            // Serialize form:
            var formData = $('#unsub-form').serializeObject();
            var query = jQuery.param(formData);
            // Make button disabled:
            $("#unsub-submit").prop("disabled", true);
            blockUI(i18nJS_processing);
            // On success:
            $.ajax({
                url: "user/unsubscribe",
                headers: {
                    "auth-token": 1
                },
                data: query,
                type: 'post',
                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                    //console.log("signup : error", data);
                    $("#unsub-submit").prop("disabled", false);
                    if (data.responseJSON) {
                        $('#unsub-error-message').text(data.responseJSON.message);
                    } else {
                        $('#unsub-error-message').text(i18nJS_error_unsubscribe);
                    }
                    $('#unsub-error').show();
                },
                success: function (data) {
                    //console.log("signup : success", data);
                    $("#unsub-submit").prop("disabled", false);
                    if (data.status == 200) {
                        $('#unsub-error').hide();
                        toastr.success(data.message);
                        window.location.href = "home";
                    } else {
                        $('#unsub-error-message').text(data.message);
                        $('#unsub-error').show();
                    }
                }
            });
        }
    });
});
