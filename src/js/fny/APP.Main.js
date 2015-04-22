var map_home = 0;
var cdc_data = 0;
function getHouseholdMembers(table) {
//    blockUI(i18nJS_please_wait);
    $.ajax({
        url: "user/household",
        headers: {
            "auth-token": 1
        },
        type: 'get',
        error: function (data, XMLHttpRequest, textStatus, errorThrown) {
//      //console.log("getHouseholdMembers error:", data);
            setTimeout(getHouseholdMembers, 1000, table);
        },
        success: function (data) {
//      console.log("getHouseholdMembers success:", data);
            if (data.household) {
                mountHouseholdTable(table, data.household);
            } else {
                setTimeout(getHouseholdMembers, 1000, table);
            }
        }
    });
}
function mountHouseholdTable(table, household) {
    $('#' + table).empty();
    var trHTML = '';
    $.each(household, function (i, item) {
        trHTML += '<tr><td>' + item.nickname + '</td><td>' + item.gender + '</td><td>' + item.dob + '</td>';
//    console.log("current_survey", item.nickname, item.current_survey);
        if (!item.current_survey) {
            trHTML += '<td><a href="survey?user_household_id=' + item.user_household_id + '" class="btn-report btn btn-xs btn-info" data-uhid="{{ user.user_household_id }}"><span class="icon-survey glyphicon glyphicon-bullhorn"></span> Report</a></td>';
        } else {
            trHTML += '<td><span style="font-size: 18px" class="glyphicon glyphicon-ok-sign text-info"></span></td>';
        }
        trHTML += "<tr/>";
    });
    $('#' + table).append(trHTML);
}
function blockUI(message) {
    $.blockUI({
        baseZ: 900000,
        message: '<div><img src="img/loading.gif" /><h4>' + message + '</h4></div>',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}
function show_cdc_data(e) {
    if (cdc_data == 0) {
        $("#illness-options").hide();
        $("#illness").fadeIn();
        cdc_data = 1;
    } else {
        $("#illness").hide();
        $("#illness-options").fadeIn();
        cdc_data = 0;
    }
}

function open_map_responsive(e) {
    if (map_home == 0) {
//        $('.banner-home-initial').hide();
        $('.map').show();
        $('#overlay_data').show();
        $(document.body).addClass('home-show-map');
        $(".view-map").addClass("hide-data");
        $(".view-map").html("HIDE MAP");
        $(".wrapper-statics").hide();
        map_home = 1;
        if(e!=null) {
            if(app.map == null)abreMapa(false);
        }
    } else {
        $('.map').hide();
//        $('.banner-home-initial').show();
        $('#overlay_data').hide();
        $(document.body).removeClass('home-show-map');
        $(".view-map").removeClass("hide-data");
        $(".view-map").html("VIEW MAP");
        $(".wrapper-statics").show();
        map_home = 0;
    }

}

$('.hide-data').on("click", function (e) {
    $('view-data').removeClass("hide-data");
    $('view-data').html("SHOW DATA");
})

data_home = 0;

function open_data(e) {
    if (data_home == 0) {
        $("#illness, .wrapper-show-desease-near-me").show();
        $(".view-data").addClass("hide-data");
        $(".view-data").html("HIDE DATA");
        data_home = 1;
    } else {
        $("#illness, .wrapper-show-desease-near-me").hide();
        $(".view-data").removeClass("hide-data");
        $(".view-data").html("SHOW DATA");
        data_home = 0;
    }

}

$(".item_accordion input").on("click", function (e) {
    the_id = e.currentTarget.id;
    $(".item_accordion input").parent().removeClass("active_servicio");
    //$(".item_accordion input").prop("checked", "true");

    $("#" + the_id).parent().addClass("active_servicio");
});

$(".item_accordion input").prop('checked', false);
$(".item_accordion > input").on("click", open_active_accordion);


function open_active_accordion(e) {
    the_id = e.currentTarget.id;
    prop_checked = $("#" + the_id).prop("checked");

    if (!prop_checked) {
        $("#" + the_id).parent().removeClass("active_servicio");
    } else {
        $(".item_accordion input").prop('checked', false);
        $(".item_accordion input").removeClass("active_servicio");
        $("#" + the_id).parent().addClass("active_servicio");
        $("#" + the_id).prop('checked', true);
    }
}

description = 0;
$(".down_description_count").on("click", function (e) {
    //alert("hola");
    if (description == 0) {
        $(".description_symptoms_item").css("max-height", "200px");
//    $(".down_description_count").addClass("arrow-down");
        description = 1;
    } else {
        $(".description_symptoms_item").css("max-height", "0px");
//    $(".down_description_count").removeClass("arrow-down");
        description = 0;
    }
});

function open_modal() {
    $('#modals-wrapper').fadeIn();
    $('.main-menu-button').hide();
    // $('#navbar-primary').css('zIndex', '999');
}

$(".item_accordion input").on("click", function (e) {
    the_id = e.currentTarget.id;
    $(".item_accordion input").parent().removeClass("active_servicio");
    //$(".item_accordion input").prop("checked", "true");
    $("#" + the_id).parent().addClass("active_servicio");
});

$(".item_accordion input").prop('checked', false);
$(".item_accordion > input").on("click", open_active_accordion);

function open_active_accordion(e) {
    the_id = e.currentTarget.id;
    prop_checked = $("#" + the_id).prop("checked");

    if (!prop_checked) {
        $("#" + the_id).parent().removeClass("active_servicio");
    } else {
        $(".item_accordion input").prop('checked', false);
        $(".item_accordion input").removeClass("active_servicio");
        $("#" + the_id).parent().addClass("active_servicio");
        $("#" + the_id).prop('checked', true);
    }
}
function redirectUser(current_survey, token) {
    var redirect_url;
    console.log("current_survey", current_survey);
    if (!current_survey) {
        redirect_url = "survey?token=" + token;
    } else {
        redirect_url = "home?token=" + token;
    }
    setTimeout(function () {
        window.location.href = redirect_url;
    }, 1500);
}
function open_login_modal(e) {
    e.preventDefault();
    close_modal();
    $('#modal-login').modal('show');
    $('.main-menu-button').hide();
}
function open_signup_modal(e) {
    e.preventDefault();
    close_modal();
    $('#modal-login').modal('hide');
    $('.main-menu-button').hide();
}
function open_survey_modal1(e) {
    e.preventDefault();
    close_modal();
    $('#modal-survey-step1').modal('show');
}
function open_survey_modal2(e) {
    e.preventDefault();
    close_modal();
    $('#modal-survey-step2').modal('show');
}
function open_survey_modal3(e) {
    e.preventDefault();
    close_modal();
    $('#modal-survey-step3').modal('show');
}
function open_survey_modal4(e) {
    e.preventDefault();
    close_modal();
    $('#modal-survey-step4').modal('show');
}
function open_survey_modal5(e) {
    e.preventDefault();
    close_modal()
    $('#modal-survey-step5').modal('show');
}
function close_modal() {
    $('#modal-survey-step1').modal('hide');
    $('#modal-survey-step2').modal('hide');
    $('#modal-survey-step3').modal('hide');
    $('#modal-survey-step4').modal('hide');
    $('#modal-survey-step5').modal('hide');
    $("#modal-registration").modal('hide');
    $('#illness').css('zIndex', '999');

    $('.modal-list').show();
    $('.modal-right-div h4').show();
    $('.modal-right-div h3').show();
    $('#facebook-register').show();
    $('#google-plus-register').show();
    $('.btn-register').show();
    $('.text-separator').show();
    $('.open_form').show();
    $('#registration-form').hide();
    $('.main-menu-button').show();
}
function abreMapa(center) {
    if(app.map == null) {
        $('#navbar-map').addClass('active');
        app.openMap(center);
    }
}
$("#flu-map").click(function(e){
    e.preventDefault();
    map_home=0;
    open_map_responsive(null);
    $('#navbar-about').removeClass('active');
    if(app.map == null) {
        abreMapa(true);
    }
});
$('#form_zip').submit(function(e){
//    console.log("#form_zip.submit");
    e.preventDefault();
    map_home=0;
    open_map_responsive(null);
    if(app.map == null) {
        abreMapa(true);
    } else app.centerOnZip();
});
$('#state_viewtype_flu').on('click', function () {
    $('#cdc-statics').show();
    $('#user-statics').hide();
    map.setView('cdc');
});

$('.button-cta').on('click', function () {
    $('.main-menu-button').hide();
});

$('#state_viewtype_user').on('click', function () {
    map.setView('user');
});

$('.hide-illness').on('click', function () {
    $('#illness').fadeOut();
    $('.show-illness').fadeIn();
    $('.hide-illness').hide();
    $('.wrapper_button_hide_show_illness').css('left', '0');
});

$('.show-illness').on('click', function () {
    $('#illness').fadeIn();
    $('.show-illness').fadeOut();
    $('.hide-illness').fadeIn();
    $('.wrapper_button_hide_show_illness').css('left', '330px');
    if ($(window).width() <= "480") {
        $('.wrapper_button_hide_show_illness').css('left', '32px');
    }
});

$(".open-previous").on("click", open_previous);

function open_previous(e) {
    if ($(window).width() <= "480") {
        $('.wrapper-items-symptoms').css("top", "165px");
        $('.wrapper-items-previous').css('height', '194px');
        $('.wrapper-items-previous').css('top', '0');
        $('.wrapper-items-symptoms').css('height', '29px');
        $('.wrapper-items-previous').css("padding-top", "29px");
        $('.close-section-sym').css("transform", "rotate(45deg)");
        $('.close-section-prev').css("transform", "rotate(0deg)");
        $('.open-previous').addClass('close-prev');

        $('.close-prev').on("click", function () {
            $('.open-previous').removeClass('close-prev');
            $(this).off("click");
            $('.wrapper-items-previous').css('height', '29px');
            $('.wrapper-items-previous').css("position", "relative");
            $('.wrapper-items-previous').css("top", "0px");
            $('.wrapper-items-previous').css("padding-top", "0px");
            $('.wrapper-items-symptoms').css("top", "0px");
            $('.close-section-prev').css("transform", "rotate(45deg)");
            $(".open-symptoms").on("click", open_symptoms);
            $(".open-previous").on("click", open_previous);
            $('open-symptoms').removeClass('close-sym');
        });
    }
    ;
}


$(".open-symptoms").on("click", open_symptoms);

function open_symptoms(e) {
    if ($(window).width() <= "480") {
        $('.wrapper-items-symptoms').css("height", "120px");
        $('.wrapper-items-symptoms').css("top", "0px");
        $('.wrapper-items-previous').css('height', '29px');
        $('.wrapper-items-previous').css("position", "relative");
        $('.wrapper-items-previous').css("top", "91px");
        $('.wrapper-items-previous').css("padding-top", "0px");
        $('.close-section-sym').css("transform", "rotate(0deg)");
        $('.close-section-prev').css("transform", "rotate(45deg)");
        $(".open-symptoms").addClass("close-sym");

        $('.close-sym').on('click', function (e) {
            $(this).off('click');
            $('open-symptoms').removeClass('close-sym');
            $('.wrapper-items-symptoms').css('height', '29px');
            $('.close-section-sym').css("transform", "rotate(45deg)");
            $('.wrapper-items-previous').css('top', '0px');
            $(".open-previous").on("click", open_previous);
            $(".open-symptoms").on("click", open_symptoms);
            $('.open-previous').removeClass('close-prev');

        });

    }
    ;
}

$('#open-form').on('click', function (event) {
    event.preventDefault();

    $('.show-modal-registration').slideDown();

    $('#modal-registration').css({
        'display': 'block',
        'overflow': 'hidden',
        'height': '564px'
    });

    $('.modal .modal-right-div').css({
        'overflow': 'scroll !important',
        'height': '426px'
    });

    $('.open-form').css('margin', '10px 0 40px 0');
     $(this).css({
        "transition": "all 2000ms",
        "position": "relative",
        "top": "1em"
    });

    $('.modal-registration').animate({
        scrollTop: $('#registration-form').offset().top
    }, 2000);
});

// close modal with esc
$(document).on('keyup', function (event) {
    if (event.keyCode == 27) {
        checkModal()
        close_modal();
    }
});

// smooth scroll
$('.go-to').on('click', function (event) {
    event.preventDefault();
    var target = $(this).attr('href');
    console.log("target", target);
    setTimeout(function(){
        smoothScroll($(target), 150);
    }, 10);
});
function smoothScroll(target, offset) {
    console.log("target", target);
    var k = target.offset().top - offset;
    $('html, body').animate({
        scrollTop: k
    }, ((k/1000)*1000));
}

$(document).on('click', function () {
    checkModal()
});

function checkModal() {
    if ($('body').hasClass('modal-open')) {
        $('#illness').css('zIndex', '9999');
        $('#navbar-primary').css('zIndex', '999');
    } else {
        $('#illness').css('zIndex', '999');
        $('#navbar-primary').css('zIndex', '9999');
    }
}

// sticky navbar
$("#navbar-primary").sticky({
    topSpacing: 0,
    className: 'js-active',
    wrapperClassName: 'wrapper-navbar-primary'
});

$('#navbar-primary').css({
    'height': '100px',
    'opacity': '1'
});

$('#navbar-primary').on('sticky-start', function () {
    $('#navbar-primary').css('height', '60px');
});

$('#navbar-primary').on('sticky-end', function (event) {
    $('#navbar-primary').css('height', '110px');
});
// end sticky


$('.close-buton-login, .no-thanks a').on('click', function (event) {
    event.preventDefault();
    close_modal();
});






// modal-existing-user
$('.share-social').on('click', 'a', function (event) {
    event.preventDefault();
    var href, id, social, url;

    href = $(this).attr('data-href');
    network = $(this).attr('id');

    checkUrl(href, network);
    $('body').removeClass('modal-open');
    $('.modal-backdrop ').removeClass('modal-backdrop');
    $('#modal-social').attr('aria-hidden', 'true');
    $('#modal-social').removeClass('in');
    $('#modal-social').css('display', 'none');
});

// change icon for settings
$('#accordion').on('click', 'h3', function () {
    $('#accordion h3').removeClass();
    $(this).addClass('js-active');
});

function checkUrl(href, network) {
    if (network == 'twitter') {
        url = 'https://twitter.com/home?status=' + href;
        var left = Number((screen.width / 2) - (400 / 2)), tops = Number((screen.height / 2) - (250 / 2));
        window.open(url, 'gplus', 'width=600,height=250, left=' + left + ',top=' + tops);
    } else if (network == 'facebook') {
        FB.ui({
            method: 'share',
            href: href
        }, function (response) {
        });
    } else if (network == 'google') {
        url = 'https://plus.google.com/share?url=' + href;
        var left = Number((screen.width / 2) - (600 / 2)), tops = Number((screen.height / 2) - (400 / 2));
        window.open(url, 'gplus', 'width=600,height=400, left=' + left + ',top=' + tops);
    }
}


$('.item-help').on('mouseover', function (e) {
    the_id = e.currentTarget.id;
    $('#' + the_id + ' .wrapper-social-networks-help').show();
});

$('.item-help').on('mouseout', function (e) {
    the_id = e.currentTarget.id;
    $('.wrapper-social-networks-help').hide();
});

$('.hidestep2').on('click', function (e) {
    e.preventDefault();
    $(".span-title-survey").hide();
    $('.survey-2-step').hide();
    $('.survey-3-step').fadeIn();
});

$('.hidestep3').on('click', function (e) {
    e.preventDefault();
    $('.survey-3-step, .span-title-survey').hide();
    $('.survey-4-step').fadeIn();
});

// tabs how-it-works
$('.tab-help:first').addClass('current-tab');
$('#content-tab-two').hide();

$('.item-tab').on('click', 'a', function (event) {
    event.preventDefault();
    var href = $(this).attr('href');

    $('.item-tab a').removeClass('current-tab');
    $(this).addClass('current-tab');

    $('.content-tab-item').hide();
    $(href).fadeIn();
});
// end tabs

$("#not-symptoms").on("click", function (e) {
    if ($(this).prop('checked') == true) {
        $('.survey-group .wrapper-checkbox input[type="checkbox"]').prop('checked', false);
        $('.survey-range-calendar-wrapper').hide();
        $(".wrapper-temperatura-fever").hide();
    }
});

$('#modal-sign-up').on('click', open_survey_modal1);
$('#modal-to-step2').on('click', open_survey_modal2);
$('#modal-to-step3').on('click', open_survey_modal3);
$('#modal-to-step5').on('click', open_survey_modal5);
$(".go-login").on('click', open_login_modal);
$(".go-signup").on('click', open_signup_modal);
$(".view-data").on("click", open_data);
$(".view-map").on("click", open_map_responsive);

$('.sintoma').change(function () {
    if ($(this).is(":checked")) {
        $("#no-sintomas").prop('checked', false);
    }
});

$('#fiebre').change(function () {
    if ($(this).is(":checked")) {
        $("#fever_f").val("N");
        $("#no-sintomas").prop('checked', false);
        $(".wrapper-temperatura-fever").show();
    } else {
        $(".wrapper-temperatura-fever").hide();
    }
    $('#textbox1').val($(this).is(':checked'));
});

$(".show-cdc-data").on("click", show_cdc_data);
$(document).ajaxStop($.unblockUI);
jQuery.fn.selectOptionWithText = function selectOptionWithText(targetText) {
    return this.each(function () {
        var $selectElement, $options, $targetOption;

        $selectElement = jQuery(this);
        $options = $selectElement.find('option');
        $targetOption = $options.filter(
            function () {
                return jQuery(this).text() == targetText
            }
        );

        // We use `.prop` if it's available (which it should be for any jQuery
        // versions above and including 1.6), and fall back on `.attr` (which
        // was used for changing DOM properties in pre-1.6) otherwise.
        if ($targetOption.prop) {
            $targetOption.prop('selected', true);
        }
        else {
            $targetOption.attr('selected', 'true');
        }
    });
};

