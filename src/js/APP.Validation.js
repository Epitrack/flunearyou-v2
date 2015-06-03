// ==========================================
// Validation
// ==========================================

var APP = APP || {};
APP.Validation = {
  setUp: function() {
  },

  fny: function() {
    // Signup Methods:
    $.validator.addMethod("isAlive", function(value, element, params) {
        var age = parseInt(moment().diff(new Date(value,1,1), 'years'));
        console.log("age", age);
        return (value < 2016 && age >= 0 && age < 90);
    //    var d = new Date();
    //    var curmonth = d.getMonth() + 2;
    //    if(parseInt(value) == 1998 && $('#birthmonth').val() < curmonth || parseInt(value) < 1998) {
    //        return true;
    //    }
    }, i18nJS_invalid_bday);
    $.validator.addMethod("oldEnough", function(value, element, params) {
        var age = parseInt(moment().diff(new Date(value,1,1), 'years'));
        console.log("age", age);
        return (age >= 13);
    //    var d = new Date();
    //    var curmonth = d.getMonth() + 2;
    //    if(parseInt(value) == 1998 && $('#birthmonth').val() < curmonth || parseInt(value) < 1998) {
    //        return true;
    //    }
    }, i18nJS_minimum13);

    $.validator.addMethod("validEmail", function(value, element, params) {
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(value);
    }, app.form_validation_email);

    jQuery.validator.addMethod("notEqual", function(value, element, param) {
        return this.optional(element) || value != param;
    },i18nJS_select_birthmonth);

    $.validator.addMethod("validZip", function(value, element, params) {
        //   var pattern = new RegExp(/^\d{5}$/);
        // match Canadian and US Postal Codes
        var pattern = new RegExp(/(^\d{5}$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1} *\d{1}[A-Za-z]{1}\d{1}$)/);
        return pattern.test(value);
    }, i18nJS_valid_postal_code);

    // Survey Methods:

    $.validator.addMethod('symptomsReporting', function() {
        //console.log("sintoma", $('input:checkbox:checked.sintoma').length);
        //console.log("no symptoms", $('input:checkbox:checked.no_symptoms').length);
        if ($('input:checkbox:checked.sintoma').length < 1 && $('input:checkbox:checked.no_symptoms').length < 1) {
            return false;
        }
        else {
            return true;
        }
    }, i18nJS_report_symptoms);

    $.validator.addMethod('vaccineQuestion', function() {
        if (!$("input[name='flu_vaccine']:checked").val()) {
            return false;
        } else {
            //console.log("vaccineQuestion true");
            return true;
        }
    }, i18nJS_report_vaccination_status);

    $.validator.addMethod('extraVaccineQuestion', function() {
        if (!$("input[name='flu_vaccine_lastyr']:checked").val()) {
            return false;
        } else {
            return true;
        }
    }, i18nJS_report_vaccination_status);

    $.validator.addMethod('suddenSymptoms', function() {
        if ($('input:checkbox:checked.symptoms').length > 0) {
            if (!$("input[name='acute']:checked").val()) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, i18nJS_report_sudden_symptoms);

    $.validator.addMethod('wasTraveling', function() {
        if ($('input:checkbox:checked.symptoms').length > 0) {
            if (!$("input[name='traveling']:checked").val()) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, i18nJS_report_travel_status);
    jQuery('.numbersOnly').keyup(function () {
        this.value = this.value.replace(/[^0-9]/g,'');
    });

  }
}


