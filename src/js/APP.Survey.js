// ==========================================
// Survey page
// ==========================================

var APP = APP || {};
APP.Survey = {
  setUp: function() {

  },

  fny: function() {
      $(function () {
      var week_of = moment(app.week_of, "YYYY-MM-DD");
      var next_week_of = moment(app.next_week_of, "YYYY-MM-DD");
      var endpoint = "survey";
      $('#survey-submit').on("click", function (e) {
      // Little hack to show next screen:
      //    e.preventDefault();
      //    $('.survey-1-step').hide();
      //    $('.survey-2-step').fadeIn();
      });
      $("#bt-process-reminder").click(function () {
      var remindMe = $('input[name="remind_me"]:checked').val();
      if (remindMe == 2) {
      blockUI("...");
      $.ajax({
      url: "user/reminder/enable",
      headers: {
      "auth-token": 1
      },
      type: 'post',
      success: function (result) {
      toastr.success(result.message);
      window.location.href = "home?thanks=1";
      }
      }).retry({times: 3});
      } else if (remindMe == 0) {
      blockUI("...");
      $.ajax({
      url: "user/reminder/disable",
      headers: {
      "auth-token": 1
      },
      type: 'post',
      success: function (result) {
      toastr.success(result.message);
      window.location.href = "home?thanks=1";
      }
      }).retry({times: 3});
      } else if(remindMe == 1){
      $(".span-title-survey").hide();
      $('.survey-2-step').hide();
      $('.survey-3-step').fadeIn();
      } else {
      window.location.href = "home?thanks=1";
      }
      });
      //survey form validation
      $("#survey-form").validate({
      ignore: '',
      rules: {
      flu_vaccine: {
      required: true,
      vaccineQuestion: true
      },
      flu_vaccine_lastyr: {
      required: true
      },
      no_symptoms: {
      symptomsReporting: true
      }
      },
      errorClass: "survey-error",
      errorElement: "div",
      errorPlacement: function (error, element) {
      error.insertAfter(element.parent().parent());
      },
      invalidHandler: function (event, validator) {
      // Registration error message:
      //console.log("invalid", event, validator);
      $('#survey-error-message').text(i18nJS_error_form);
      $('#survey-error').show();
      },
      submitHandler: function () {
      $('#survey-error').hide();
      // Serialize form:
      var formData = $('#survey-form').serializeObject();
      if (formData.date != null) {
      delete formData.date;
      }
      if (formData.date_submit != null) {
      delete formData.date_submit;
      }
      if (formData.ill_date == "") {
      delete formData.ill_date;
      }
      if (formData.fever_f == "") {
      delete formData.fever_f;
      }
      if (formData.user_household_id == -1) {
      formData.user_household_id = 0;
      endpoint = "survey/all";
      } else if (formData.user_household_id == 0) {
      endpoint = "survey";
      }
      var query = jQuery.param(formData);
      // Make button disabled:
      $("#survey-submit").prop("disabled", true);
      blockUI("Sending Survey");
      // On success:
      $.ajax({
      url: endpoint,
      headers: {
      "auth-token": 1
      },
      data: query,
      type: 'post',
      error: function (data, XMLHttpRequest, textStatus, errorThrown) {
      $("#survey-submit").prop("disabled", false);
      if (data.responseJSON) {
      $('#survey-error-message').text(data.responseJSON.message);
      } else {
      $('#survey-error-message').text(i18nJS_error_survey);
      }
      $('#survey-error').show();
      },
      success: function (data) {
      /*--- BEGIN NANIGANS SURVEY TRACKING ---*/
      var nanigans_value = 1;
      var unique = new Date().getTime();
      if (weeks_reported == 0) {
      var nanigans_url = "https://api.nanigans.com/event.php?app_id=157283&s2s=1&type=purchase&name=firstsurveysubmit&user_id=" + user_id + "&value[0]=" + nanigans_value + "&unique=" + unique;
      } else {
      var nanigans_url = "https://api.nanigans.com/event.php?app_id=157283&s2s=1&type=purchase&name=secondsurveysubmit&user_id=" + user_id + "&value[0]=" + nanigans_value + "&unique=" + unique;
      }
      $.ajax({type: "GET", url: nanigans_url});
      /*--- END NANIGANS SURVEY TRACKING ---*/

      if (data.status == 200) {
      var pm = data.pending_members;
      if(!pm) pm = pending_members;
      if (pm) {
      window.location.href = "survey?user_household_id=" + pm;
      } else {
      toastr.success(data.message);
      if(hasHousehold || moreMembers == 'N') {
      window.location.href = "home?thanks=1";
      } else {
      $('.survey-1-step').hide();
      $('.survey-2-step').fadeIn();
      }
      }
      } else {
      $('#survey-error-message').text(data.responseJSON.message);
      $('#survey-error').show();
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
      maxlength:20
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
      error.insertAfter(element.parent());
      },
      invalidHandler: function (event, validator) {
      // Registration error message:
      //console.log("invalid", event, validator);
      $('#household-error-message').text(i18nJS_error_form);
      $('#household-error').show();
      },
      submitHandler: function () {
      // Serialize form:
      var formData = $('#add-household-form').serializeObject();
      var query = jQuery.param(formData);
      $('#household-error').hide();
      //console.log("query", query);
      // Make button disabled:
      $("#survey-submit").prop("disabled", true);
      blockUI(i18nJS_adding_member);
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
      //console.log(data);
      if (data.status == 200) {
      toastr.success(data.message);
      $('#add-household-form')[0].reset();
      getHouseholdMembers("members-table");
      } else {
      $('#household-error-message').text(data.responseJSON.message);
      $('#household-error').show();
      }
      }
      });
      }
      });
      $(document).ready(function () {
      $(document).ajaxStop($.unblockUI);
      $("#thermometer_bg").width(0);
      var user_household_id = location.search.split('user_household_id=')[1];
      if (user_household_id) {
      var option = $('#household').find('option[value="' + user_household_id + '"]');
      option.attr("selected", true);
      }
      });
      //disable other symtoms when no symptoms is selected
      $('#not-symptoms').on('change', function () {
      $('#conditional').toggleClass('disabled');
      if ($('#conditional').hasClass('disabled')) {
      $('#temperature,#datepicker').hide();
      $('#conditional input').attr('disabled', true);
      $('.symptom').attr('checked', false);
      $("#fever_f").val("");
      } else {
      $("#fever_f").val("");
      $('#conditional input').attr('disabled', false);
      }
      });
      //thermometer
      var v = 0;
      var slide = function (event, ui) {
      var l;
      // console.log(ui.value);
      var left = $(".ui-slider-handle").position().left;
      if (ui.value > v) {
      l = $(".ui-slider-handle").position().left;
      } else {
      // v = ui.value;
      l = $(".ui-slider-handle").position().left;
      // console.log('negativo', ui.value, l, left);
      }
      console.log('positivo', 'ui.value: ', ui.value, 'l: ', l, 'left: ', left, 'v: ', v);
      $("#thermometer_bg").width(l);
      v = ui.value;
      if (ui.value > 1) {
      var n = (99.7 + ui.value / 10).toFixed(1);
      if (n >= 101) {
      $('#text-slider').html(i18nJS_greater_than + n + ' ºF');
      $("#fever_f").val(101);
      $('#thermometer_bg').addClass('hight'); //elegant logic. well done, @thulioph
      } else if (n == 99.9) {
      $('#text-slider').html(i18nJS_less_than + 99.9 + ' ºF');
      $("#fever_f").val(99.9);
      $('#thermometer_bg').removeClass();
      } else {
      $('#text-slider').html(n + ' ºF');
      $("#fever_f").val(n);
      $('#thermometer_bg').removeClass();
      }
      } else {
      $('#text-slider').html("");
      }
      };
      $('#text-slider').html("");
      $("#thermometer_slider").slider({
      range: false,
      min: 1,
      max: 13,
      step: 1,
      animate: false,
      value: 1,
      slide: slide,
      change: slide
      });
      function plus() {
      var a = $('#thermometer_slider').slider('value');
      $('#thermometer_slider').slider('value', ++a)
      }
      function minus() {
      var a = $('#thermometer_slider').slider('value');
      $('#thermometer_slider').slider('value', --a)
      }
      $('#button-thermometer-plus').on('click', function () {
      // console.log('Plus');
      plus();
      });
      $('#button-thermometer-minus').on('click', function () {
      // console.log('Minus');
      minus();
      });
      //calendar
      $('#conditional').on('click', 'input, label', function () {
      $('#datepicker').show();
      if ($('.symptom:checked').length == 0) {
      $('#datepicker').hide();
      }
      });
      //    console.log("week_of", app.week_of);
      $('#calendar_content').on('click', '.js-week', function () {
      $('#calendar_content').find('div').removeClass('today');
      $(this).addClass('today');
      // checkWeek($(this).index());
      });
      $('#calendar_header').on('click', 'i', function () {
      $('.blank').remove();
      });
      // Thermometer
      $('#temperature').hide();
      $('#not_measured').on('change', function () {
      if ($("#not_measured:checked").length == 1) {
      $('#thermometer').hide();
      $('#text-slider').hide();
      $('#button-thermometer-minus').hide();
      $('#button-thermometer-plus').hide();
      $("#fever_f").val("");
      } else {
      $('#thermometer').show();
      $('#text-slider').show();
      $('#button-thermometer-minus').show();
      $('#button-thermometer-plus').show();
      }
      });
      $('#fever').on('change', function () {
      if ($("#fever:checked").length == 1) {
      $('#temperature').show();
      $('#thermometer_slider').slider('value', 2);
      } else {
      $('#temperature').hide();
      }
      });
      // Calendar
      $('#datepicker').hide();
      $(document).on('ready', function () {
      var k = week_of.clone();
      $('#date_input').pickadate({
      min: k.day(-6).toDate(),
      max: next_week_of.toDate(),
      format: 'dddd, mmmm d yyyy',
      /*firstDay: true,*/
      onSet: function (context) {
      $("#ill_date").val(moment(context.select).format('YYYY-MM-DD'));
      }
      });
      var picker = $('#date_input').pickadate('picker');
      picker.set('select', week_of.toDate());
      $("#ill_date").val(null);
      $("#date_input").val(null);
      $('.blank').remove();
      $('.finalizar-continuar').click(function(){
      blockUI("Redirecting");
      setTimeout(function () {
      window.location.href = "survey";
      }, 2000);
      });
      });
      });

  }
}
