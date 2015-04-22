$(function () {
    $("#bt-edit").click(function (e) {
        $("#bt-edit").addClass("hidden");
        $("#update-user-form .user_form_field").removeClass("hidden");
        $("#update-user-form .user_form_label").addClass("hidden");
    });
    $(document).ready(function () {
        $(".btn-report").click(function (e) {
            var uhid = $(e.currentTarget).data("uhid");
            if (uhid) {
                window.location.href = "survey?user_household_id=" + uhid;
            }
            e.stopImmediatePropagation();
        });
        $(".btn-edit").click(function (e) {
            var uhid = $(e.currentTarget).data("uhid");
            var dob = $(e.currentTarget).data("dob");
            var gender = $(e.currentTarget).data("gender");
            var nickname = $(e.currentTarget).data("nickname");
            var month =  dob.split("/")[0];
            var year = dob.split("/")[1];

            bootbox.dialog({
                title: "Edit Household Member",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal edit_household_member" id="edit_household_member"> ' +
                    '<input name="user_household_id" id="user_household_id" type="hidden" value=' + uhid + '>' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="name">'+i18nJS_hh_nickname+'</label> ' +
                    '<div class="col-md-4"> ' +
                    '<input id="edit_household_name" name="nickname" type="text" class="form-control input-md" value="' + nickname + '">' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-4 control-label" for="gender">'+i18nJS_hh_gender+'</label> ' +
                    '<div class="col-md-4"> ' +
                    '<div class="radio"> ' +
                    '<label for="male"> ' +
                    '<input type="radio" name="gender" value="M"> '+i18nJS_hh_male+'</label> ' +
                    '</div>' +
                    '<div class="radio"> ' +
                    '<label for="female"> ' +
                    '<input type="radio" name="gender" id="female" value="F"> '+i18nJS_hh_female+'</label> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>' +
                    '<label class="col-md-4 control-label" for="birthdate">'+i18nJS_hh_bday+'</label> ' +
                    '<div class="col-md-7 nopadding">' +
                    '<div class="col-md-5 nopadding">' +
                    '<label for="" class="select month edit_household" id="edit_birthmonth">' +
                    '<select class="survey-birthmonth" name="birthmonth" id="edit_household_month" required>' +
                    '<option value="0">'+i18nJS_hh_month+'</option>' +
                    '<option value="1">'+i18nJS_hh_jan+'</option>' +
                    '<option value="2">'+i18nJS_hh_feb+'</option>' +
                    '<option value="3">'+i18nJS_hh_mar+'</option>' +
                    '<option value="4">'+i18nJS_hh_apr+'</option>' +
                    '<option value="5">'+i18nJS_hh_may+'</option>' +
                    '<option value="6">'+i18nJS_hh_jun+'</option>' +
                    '<option value="7">'+i18nJS_hh_jul+'</option>' +
                    '<option value="8">'+i18nJS_hh_aug+'</option>' +
                    '<option value="9">'+i18nJS_hh_sep+'</option>' +
                    '<option value="10">'+i18nJS_hh_oct+'</option>' +
                    '<option value="11">'+i18nJS_hh_nov+'</option>' +
                    '<option value="12">'+i18nJS_hh_dez+'</option>' +
                    '</select></label></div>' +
                    '<div class="col-md-5 nopadding">' +
                    '<input class="survey-birthyear" type="tel" name="birthyear" id="edit_household_birthyear" value="'+year+'" required>' +
                    '</div></div></div>' +
                    '</form> ' +
                    '</div>  ' +
                    '<div id="edit-error" class="alert alert-danger" style="display: none;margin-top: 30px;margin-bottom: 0" role="alert">' +
                    '<span id="edit-error-message"></span></div>' +
                    '</div>',
                buttons: {
                    main: {
                        label: i18nJS_hh_save,
                        id: "edit-submit",
                        className: "btn-success",
                        callback: function (e) {
                            $("#edit_household_member").submit();
                            return false;
                        }
                    }
                }
            });
            $("#edit_household_member select").val(month);
            $("input[name=gender][value=" + gender + "]").prop('checked', true);
            $("#edit_household_member").validate({
                rules: {
                    birthmonth: {
                        required: true,
                        min: 1,
                        number: true
                    },
                    nickname:{
                        maxlength:20
                    },
                    birthyear: {
                        isAlive:true
                    },
                    gender: "required"
                },
                messages:{
                    nickname:{
                        maxlength:i18nJS_hh_large_nick
                    }
                },
                errorClass: "survey-error",
                errorElement: "div",
                errorPlacement: function (error, element) {
                    if (element[0].name == "gender") {
                        error.insertAfter(element.parent().parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                invalidHandler: function (event, validator) {
                    $('#edit-error-message').text(i18nJS_error_form);
                    $('#edit-error').show();
                },
                submitHandler: function () {
                    // Serialize form:
                    var formData = $('#edit_household_member').serializeObject();
                    var query = jQuery.param(formData);
                    console.log("query", query);
                    $('#edit-error').hide();
                    // Make button disabled:
                    $("#edit-submit").prop("disabled", true);
                    blockUI(i18nJS_processing);
                    // On success:
                    $.ajax({
                        url: "user/household/update",
                        headers: {
                            "auth-token": 1
                        },
                        data: query,
                        type: 'post',
                        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                            $("#update-submit").prop("disabled", false);
                            if (data.responseJSON) {
                                $('#edit-error-message').text(i18nTxt(data.message, data.message_es));
                            } else {
                                $('#edit-error-message').text(i18nJS_error_user);
                            }
                            $('#edit-error').show();
                        },
                        success: function (data) {
                            $("#update-submit").prop("disabled", false);
                            if (data.status == 200) {
                                $('#edit_household_member')[0].reset();
                                toastr.success(i18nTxt(data.message, data.message_es));
                                bootbox.hideAll();
                                window.location.reload();
                            } else {
                                $('#edit-error-message').text(i18nTxt(data.message, data.message_es));
                                $('#edit-error').show();
                            }
                        }
                    });
                }
            });
            e.stopImmediatePropagation();
        });
        $(".btn-deactivate").click(function (e) {
            var uhid = $(e.currentTarget).data("uhid");
            bootbox.confirm(deactivate_message, function (result) {
                if (result) {
                    blockUI("...");
                    $.ajax({
                        url: "user/household/deactivate",
                        headers: {
                            "auth-token": 1
                        },
                        data: {user_household_id: uhid},
                        type: 'post',
                        success: function (data) {
                            window.location.reload();
                        }
                    });
                }
            });
            e.stopImmediatePropagation();
        });
        $(".btn-activate").click(function (e) {
            var uhid = $(e.currentTarget).data("uhid");
            bootbox.confirm(activate_message, function (result) {
                if (result) {
                    blockUI("...");
                    $.ajax({
                        url: "user/household/activate",
                        headers: {
                            "auth-token": 1
                        },
                        data: {user_household_id: uhid},
                        type: 'post',
                        success: function (data) {
                            window.location.href ="reports";
                        }
                    });
                }
            });
            e.stopImmediatePropagation();
        });
        $('#accordion .in').collapse('hide');
        $('.name').addClass('collapsed');
        $('#member_reports').fadeIn(1);
    });
    $("#update-user-form").validate({
        rules: {
            email: {
                validEmail: true
            },
            birthmonth: "required",
            birthyear: {
                oldEnough: true
            },
            gender: "required",
            zip: "required"
        },
        errorClass: "survey-error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        },
        invalidHandler: function (event, validator) {
            $('#update-error-message').text(i18nJS_error_form);
            $('#update-error').show();
        },
        submitHandler: function () {
            // Serialize form:
            var formData = $('#update-user-form').serializeObject();
            var query = jQuery.param(formData);
            $('#update-error').hide();
            // Make button disabled:
            $("#update-submit").prop("disabled", true);
            blockUI(i18nJS_processing);
            // On success:
            $.ajax({
                url: "user/update",
                headers: {
                    "auth-token": 1
                },
                data: query,
                type: 'post',
                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                    $("#update-submit").prop("disabled", false);
                    if (data.responseJSON) {
                        $('#update-error-message').text(data.message);
                    } else {
                        $('#update-error-message').text(i18nJS_error_user);
                    }
                    $('#update-error').show();
                },
                success: function (data) {
                    $("#update-submit").prop("disabled", false);
                    if (data.status == 200) {
                        $('#update-user-form')[0].reset();
                        $("#update-user-form .user_form_field").addClass("hidden");
                        $("#update-user-form .user_form_label").removeClass("hidden");
                        $("#bt-edit").removeClass("hidden");
                        toastr.success(data.message);
                        window.location.reload();
                    } else {
                        $('#update-error-message').text(data.message);
                        $('#update-error').show();
                    }
                }
            });
        }
    });
    $("#change-password-form").validate({
        ignore: '',
        rules: {
            old_password: "required",
            password: "required",
            confirm_password: {
                required: true,
                equalTo: "#password"
            }
        },
        errorClass: "survey-error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.insertBefore(element.parent());
        },
        invalidHandler: function (event, validator) {
            $('#password-error-message').text(i18nJS_error_form);
            $('#password-error').show();
        },
        submitHandler: function () {
            // Serialize form:
            var formData = $('#change-password-form').serializeObject();
            var query = jQuery.param(formData);
            $('#password-error').hide();
            // Make button disabled:
            $("#password-submit").prop("disabled", true);
            blockUI(i18nJS_processing);
            // On success:
            $.ajax({
                url: "user/update/password",
                headers: {
                    "auth-token": 1
                },
                data: query,
                type: 'post',
                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                    $("#password-submit").prop("disabled", false);
                    if (data.message) {
                        $('#password-error-message').text(data.message);
                    } else {
                        $('#password-error-message').text(i18nJS_error_password);
                    }
                    $('#password-error').show();
                },
                success: function (data) {
                    $("#password-submit").prop("disabled", false);
                    if (data.status == 200) {
                        $('#change-password-form')[0].reset();
                        toastr.success(data.message);
                    } else {
                        $('#password-error-message').text(data.message);
                        $('#password-error').show();
                    }
                }
            });
        }
    });
    //add household member
    $("#add-household-form").validate({
        ignore: '',
        rules: {
            nickname: {
                maxlength:30
            },
            birthmonth: "required",
            birthyear: {
                isAlive:true,
                digits:true
            },
            gender: "required"
        },
        messages:{
            nickname:{
                maxlength:"This Nickname is too large"
            }
        },
        errorClass: "survey-error",
        errorElement: "div",
        errorPlacement: function (error, element) {
            if (element[0].name == "nickname") {
                error.insertAfter(element);
            } else if (element[0].name == "year") {
                error.insertAfter(element);
            } else {
                error.insertAfter(element.parent());
            }
        },
        invalidHandler: function (event, validator) {
            // Registration error message:
            $('#household-error-message').text(i18nJS_error_form);
            $('#household-error').show();
        },
        submitHandler: function () {
            // Serialize form:
            var formData = $('#add-household-form').serializeObject();
            var query = jQuery.param(formData);
            $('#household-error').hide();
            // Make button disabled:
            $("#survey-submit").prop("disabled", true);
            blockUI(i18nJS_processing);
            // On success:
            $.ajax({
                url: "user/household",
                headers: {
                    "auth-token": 1
                },
                data: query,
                type: 'post',
                error: function (data, XMLHttpRequest, textStatus, errorThrown) {
                    $("#survey-submit").prop("disabled", false);
                    if (data.responseJSON) {
                        $('#household-error-message').text(data.responseJSON.message);
                    } else {
                        $('#household-error-message').text(i18nJS_error_member);
                    }
                    $('#household-error').show();
                },
                success: function (data) {
                    if (data.status == 200) {
                        toastr.success(i18nTxt(data.message, data.message_es));
                        $('#add-household-form')[0].reset();
                        window.location.reload();
                    } else {
                        $('#household-error-message').text(data.responseJSON.message);
                        $('#household-error').show();
                    }
                }
            });
        }
    });
    $('#add_household_member').hide();
    $('#change-password').hide();
    $('#add-member').on('click', function () {
        $('#add_household_member').slideDown();
    });
    $('#close-household-form').on('click', function (e) {
        e.preventDefault();
        $('#add_household_member').hide();
    });
    $('#close-password-form').on('click', function (e) {
        e.preventDefault();
        $('#change-password').hide();
    });
    $('.submit-change-password').on('click', function (e) {
        e.preventDefault();
        $('#change-password').slideDown();
    });
});
