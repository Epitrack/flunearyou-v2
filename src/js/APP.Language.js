// ==========================================
// Languages and internationalization
// ==========================================

var APP = APP || {};
APP.Language = {
  setUp: function() {
    this.startLanguage();
    this.changeLanguage();
  },

  startLanguage: function() {
    i18n.init({
      fallbackLng: 'en-US' // fallback when language is not defined language
      ,debug: false // debug
      ,fixLng: true // preserve cookie when language is not defined
      ,load: 'current' // define the correct form to describe language
    },

    function(translation) {
      var appName, string;

      $('[data-i18n]').i18n();
        appName = translation('app.name');
        string = document.cookie;

      if (string.indexOf('i18next=pt-BR') != -1) {
        APP.Language.i18pt();
        $('.pt').addClass('js-active');
      } else {
        APP.Language.i18en();
        $('.en').addClass('js-active');
      }

    });
  },

  i18en: function() {
    i18n.setLng('en-US', {fixLng: true}, function(translation){
      $('[data-i18n]').i18n();
    });

    $('#logo-primary').removeClass('js-logo-pt');
    $('#logo-primary').addClass('js-logo-en');
    $('.nav-logo').css('background-image', 'url(dist/images/logo-primary-2-en.png)');
    $('.navbar-brand').css('background-image', 'url(dist/images/logo-primary-2-en.png)');
  },

  i18pt: function() {
    i18n.setLng('pt-BR', {fixLng: true}, function(translation){
      $('[data-i18n]').i18n();
    });

    $('#logo-primary').removeClass('js-logo-en');
    $('#logo-primary').addClass('js-logo-pt');
    $('.nav-logo').css('background-image', 'url(dist/images/logo-primary-2-pt.png)');
    $('.navbar-brand').css('background-image', 'url(dist/images/logo-primary-2-pt.png)');
  },

  activeClass:function(element) {
    $('#switch-language button').removeClass('js-active');
    $(element).addClass('js-active');
  },

  changeLanguage: function() {
    var attr, element;

    $('#switch-language').on('click', 'button', function(event) {
      element = this;
      attr = $(this).attr('data-language');

      if (attr == 'en') {
        APP.Language.activeClass(element);
        APP.Language.i18en();
      } else if (attr == 'pt') {
        APP.Language.activeClass(element);
        APP.Language.i18pt();
      }
    });
  },

  // fny.i18n.js
  i18n: function() {
    // if(site_name == "saludboricua.org"){
    //  bootbox.setDefaults("locale", "es");
    // }
    // undefined
    // function i18nTxt(en, es){
    //     return site_name == 'flunearyou.org' ? en : es;
    // }

    // var i18nJS_sending_survey    = i18nTxt("Sending Survey","Se está enviando el informe");
    // var i18nJS_redirecting       = i18nTxt("Redirecting...","Se está redirigiendo...");
    // var i18nJS_search        = i18nTxt("Search: ","Búsqueda: ");
    // var i18nJS_processing      = i18nTxt("Processing", "Se está procesando la información");
    // var i18nJS_loading_reports     = i18nTxt("Loading Reports...", "Cargando Informes...");
    // var i18nJS_adding_member     = i18nTxt("Adding member...", "Añadiendo nuevo familiar");
    // var i18nJS_greater_than    = i18nTxt("greater than ", "más que ");
    // var i18nJS_less_than       = i18nTxt("less than ", "menos que ");
    // var i18nJS_please_wait       = i18nTxt("Please wait", "Por favor espera");
    // var i18nJS_loading_cdc_data    = i18nTxt("Loading CDC Data", "Cargando datos de los Centros para el Control y la Prevención de Enfermedades");

    // var i18nJS_hh_nickname = i18nTxt("Nickname","Apodo");
    // var i18nJS_hh_gender = i18nTxt("Gender","Género");
    // var i18nJS_hh_male = i18nTxt("Male","Masculino");
    // var i18nJS_hh_female = i18nTxt("Female","Femenino");
    // var i18nJS_hh_bday = i18nTxt("Birthdate","Fecha de nacimiento");
    // var i18nJS_hh_month = i18nTxt("Month","Mes");
    // var i18nJS_hh_jan = i18nTxt("Jan","Ene");
    // var i18nJS_hh_feb = i18nTxt("Feb","Feb");
    // var i18nJS_hh_mar = i18nTxt("Mar","Mar");
    // var i18nJS_hh_apr = i18nTxt("Apr","Abr");
    // var i18nJS_hh_may = i18nTxt("May","May");
    // var i18nJS_hh_jun = i18nTxt("Jun","Jun");
    // var i18nJS_hh_jul = i18nTxt("Jul","Jul");
    // var i18nJS_hh_aug = i18nTxt("Aug","Ago");
    // var i18nJS_hh_sep = i18nTxt("Sep","Dep");
    // var i18nJS_hh_oct = i18nTxt("Oct","Oct");
    // var i18nJS_hh_nov = i18nTxt("Nov","Nov");
    // var i18nJS_hh_dez = i18nTxt("Dec","Dic");
    // var i18nJS_hh_save = i18nTxt("Save","Guardar");
    // var i18nJS_hh_large_nick = i18nTxt("This Nickname is too large","Este apodo es demasiado grande");","

    // var i18nJS_authorize_fb =
    //  i18nTxt("Please authorize the Facebook - and try again!",
    //  "Por favor, autorizar el Facebook - y vuelve a intentarlo!");

    // var i18nJS_authorize_fb_error =
    //  i18nTxt("Unknown error occurred - please try again.!",
    //  "Por favor, autorizar el Facebook - y vuelve a intentarlo!");

    // var i18nJS_error_form =
    //  i18nTxt("Please correct error on formulary",
    //      "¡Favor de corregir el error!");

    // var i18nJS_error_login =
    //  i18nTxt("We could not log you in right now. Try again.",
    //      "No se logró entrar en este momento. Favor de intentar de nuevo.");

    // var i18nJS_error_unsubscribe =
    //  i18nTxt("We could not unsubscribe you right now. Try again.",
    //      "No se logró cancelar su subscripción en este momento. Favor de intentar de nuevo.");

    // var i18nJS_error_user =
    //  i18nTxt("Your user could not be updated right now. Try again.",
    //      "No se logró actualizar el usuario en este momento. Favor de intentar de nuevo.");

    // var i18nJS_error_password =
    //  i18nTxt("Your password could not be updated right now. Try again.",
    //      "No se logró cambiar tu contraseña en este momento. Favor de intentar de nuevo.");

    // var i18nJS_error_member =
    //  i18nTxt("Your family member could not be added right now. Try again.",
    //      "No se logró añadir a tu familiar en este momento. Favor de intentar de nuevo.");

    // var i18nJS_error_account =
    //  i18nTxt("Your account could not be created right now. Try again.",
    //      "No se logró crear tu cuenta en este momento. Favor de intentar de nuevo.");

    // var i18nJS_error_survey =
    //  i18nTxt("Your survey could not be delivered right now. Try again.",
    //      "No se logró registrar tu informe en este momento. Favor de intentar de nuevo.");

    // var i18nJS_invalid_bday =
    //   i18nTxt("Invalid Birthyear",
    //     "Fecha de nacimiento no es válido");

    // var i18nJS_minimum13 =
    //   i18nTxt("You must be 13 to participate.",
    //     "Debes de tener mayor de 13 años de edad para participar.");

    // var i18nJS_select_birthmonth =
    //   i18nTxt("Select a birthmonth",
    //     "Seleccione un mes del nacimiento");

    // var i18nJS_valid_postal_code =
    //   i18nTxt("Please enter a valid US or Canadian postal code.",
    //     "Por favor introduzca un código postal válido de Puerto Rico, EEUU o Canadá.");

    // var i18nJS_report_symptoms =
    //   i18nTxt("Please report on the status of your symptoms.",
    //     "Por favor informa de tus síntomas.");

    // var i18nJS_report_vaccination_status =
    //   i18nTxt("Please report on your vaccination status.",
    //     "Por favor informa de si hayas recibido la vacuna de influenza.");

    // var i18nJS_report_sudden_symptoms =
    //   i18nTxt("Please report whether symptoms were sudden.",
    //     "Por favor, informaron si los síntomas fueron repentinos.");

    // var i18nJS_report_travel_status =
    //   i18nTxt("Please report on status of travel.",
    //     "Por favor, informe sobre el estado de los viajes.");

  }
}
