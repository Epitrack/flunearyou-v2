"use strict";var app=angular.module("flunearyouV2App",["ngRoute","ngAnimate","ngSanitize","uiGmapgoogle-maps","ui.bootstrap","angular-loading-bar","checklist-model","pascalprecht.translate","angular-growl","facebook","googleplus"]);app.factory("session",["$http","$urlBase","$routeParams","$q","$rootScope","$window","$translate",function(e,t,o,n,s,r,i){var a=n.defer(),l=function(o){return e.get(t+"/user",{headers:{token:o}}).success(function(e,t){var o=e.info.basic.nickname,n=e.info.basic.token,i=e.info.basic.email,a={name:o,email:i,token:n};localStorage.setItem("userLogged",JSON.stringify(a)),s.$emit("IS_LOGGED"),r.location.href="#/report?token="+n}).error(function(e,t){console.log(t)}),!0},c=function(e){return i.use(e),!0},u=function(e){return console.log("track_id",e),!0},p=function(e){return console.log("campaign",e),localStorage.setItem("campaign",e),!0};return o.token&&l(o.token),o.language&&c(o.language),o.track_id&&u(o.track_id),o.campaign&&p(o.campaign),a.resolve("done"),a.promise}]),app.config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html",controller:"homeCtrl"}).when("/landing",{templateUrl:"views/landing.html",controller:"homeCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"homeCtrl"}).when("/map",{templateUrl:"views/map.html",controller:"mapCtrl"}).when("/flu-news",{templateUrl:"views/flu-news.html",controller:"fluNewsCtrl"}).when("/press",{templateUrl:"views/press.html",controller:"pressCtrl"}).when("/faq",{templateUrl:"views/faq.html",controller:"homeCtrl"}).when("/privacy",{templateUrl:"views/privacy.html",controller:"homeCtrl"}).when("/terms",{templateUrl:"views/terms.html",controller:"homeCtrl"}).when("/survey",{templateUrl:"views/survey.html",controller:"surveyCtrl"}).when("/report",{templateUrl:"views/report.html",controller:"reportCtrl"}).when("/reports",{templateUrl:"views/reports.html",controller:"healthReportCtrl"}).when("/settings",{templateUrl:"views/settings.html",controller:"settingCtrl"}).when("/unsubscribe",{templateUrl:"views/unsubscribe.html",controller:"unsubscribeCtrl"})}]).animation(".reveal-animation",function(){return{enter:function(e,t){return e.css("display","none"),e.fadeIn(600),function(){e.stop()}},leave:function(e,t){return e.fadeOut(100),function(){e.stop()}}}}),app.value("$urlBase","http://dev.flunearyou.org"),app.config(["uiGmapGoogleMapApiProvider",function(e){e.configure({china:!0})}]),app.config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1,e.includeBar=!0,e.parentSelector="#loading-bar-container",e.spinnerTemplate='<div><span class="fa fa-spinner">Custom Loading Message...</div>'}]),app.config(["$translateProvider",function(e){localStorage.getItem("translations_en")&&localStorage.getItem("translations_es")?e.translations("en",JSON.parse(localStorage.getItem("translations_en"))).translations("es",JSON.parse(localStorage.getItem("translations_es"))).preferredLanguage("en").useSanitizeValueStrategy(null):$.get("http://dev.flunearyou.org/translations").success(function(t,o){localStorage.setItem("translations_en",JSON.stringify(t.translations.en)),localStorage.setItem("translations_es",JSON.stringify(t.translations.es)),e.translations("en",JSON.stringify(t.translations.en)).translations("es",JSON.stringify(t.translations.es)).preferredLanguage("en").useSanitizeValueStrategy(null),window.location.reload()}).error(function(e,t){console.log("Error in angularTranslateConfig.js"),console.log(e,t)})}]),app.config(["FacebookProvider",function(e){var t=window.location.href;if(-1!=t.indexOf("localhost"))var o="362068090500998";else var o="463215990541721";e.init(o)}]),app.config(["GooglePlusProvider",function(e){e.init({clientId:"736037612174-lpmdhpfcfane9p9cvqb9d6lkc5fc15mr.apps.googleusercontent.com",apiKey:"Tpwrqg_jpW-qIZJPBDNeJu14"})}]),app.controller("MainCtrl",["$scope","cdcstates",function(e,t){}]),app.controller("mapCtrl",["$scope","$rootScope","$http","$urlBase","session",function(e,t,o,n,s){s.then(function(){t.$emit("IS_LOGGED"),t.$emit("SCROLL_TOP");var s={_markers:[],LatLng:function(e,t){return new google.maps.LatLng(e,t)},initMap:function(e,t,n,r,i){var a=[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road",elementType:"labels.text",stylers:[{visibility:"on"},{color:"#000000"}]},{featureType:"road",elementType:"labels.icon",stylers:[{weight:"0.01"},{visibility:"off"},{hue:"#ff8f00"}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#f2f2f2"},{weight:"2.32"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.station.airport",elementType:"geometry.fill",stylers:[{visibility:"on"},{color:"#ffce00"},{weight:"0.01"}]},{featureType:"water",elementType:"all",stylers:[{color:"#d4ebf5"},{visibility:"on"}]}],l=s.LatLng(e,t),c=new google.maps.StyledMapType(a,{name:"Styled Map"}),u={center:l,zoom:n,mapTypeControl:!1,panControl:!1,streetViewControl:!1,zoomControl:!0,scrollwheel:!1,zoomControlOptions:{style:google.maps.ZoomControlStyle.SMALL}},p=new google.maps.Map(document.getElementById("map"),u),d=new google.maps.Geocoder;return p.mapTypes.set("map_style",c),p.setMapTypeId("map_style"),r?o.get("scripts/json/cdc.json").success(function(e,t){var o=e;p.data.loadGeoJson("scripts/json/states.geo.json"),p.data.setStyle(function(e){var t,n=e.getProperty("name");return o[n]&&(t=o[n].fill.color),{fillColor:t,fillOpacity:.75,strokeWeight:1}})}):s.getMarkers(p),i&&s.mapForZipCpde(p,d),p},mapForZipCpde:function(e,t){var o=sessionStorage.getItem("zip");t.geocode({address:o},function(t,o){if(o==google.maps.GeocoderStatus.OK){e.setCenter(t[0].geometry.location),e.setZoom(9);new google.maps.Marker({map:e,position:t[0].geometry.location,icon:"images/marker.png",zIndex:9999})}else alert("Geocode was not successful for the following reason: "+o)})},getMarkers:function(e){o.get(n+"/map/markers").success(function(t,o,n,r){for(var i=t,a=[],l=0;l<i.length;l++){var c=i[l],u=c.icon,p="";switch(u){case"1":p="images/icon-azul.png";break;case"3":p="images/icon-amarelo.png";break;case"5":p="images/icon-vermelho.png"}var d={id:l,image:p,latitude:c.latitude,longitude:c.longitude,zIndex:null,msg:'<div class="infowindow"><header><h3>'+c.city+'</h3></header><div class="infos"><p class="qtdSym">'+c.flu+'</p><p>FLU<br/> SYMPTOMS</p></div><div class="infos border"><p class="qtdSym">'+c.symptoms+'</p><p>ANY<br/> SYMPTOMS</p></div><div class="infos"><p class="qtdSym">'+c.none+"</p><p>NO<br/> SYMPTOMS</p></div></div>"};5==c.icon?d.zIndex=9998:3==c.icon?d.zIndex=700:d.zIndex=100,a.push(d)}s.putMarkersInMap(e,a)})},putMarkersInMap:function(e,t){for(var o=0;o<t.length;o++){var n=t[o],r=new google.maps.LatLng(n.latitude,n.longitude),i=new google.maps.Marker({position:r,map:e,icon:n.image,zIndex:n.zIndex});s._markers.push(i),s.openInfoWin(i,n.msg)}},hideMarkers:function(){for(var e=s._markers,t=0;t<e.length;++t)e[t].setVisible(!1);window.innerHeight>window.innerWidth?s.initMap("40.0902","-98.7129",3,!0,!1):s.initMap("40.0902","-110.7129",4,!0,!1),$(".info-cdc").removeClass("none")},showMarkers:function(){for(var e=s._markers,t=0;t<e.length;++t)e[t].setVisible(!0);window.innerHeight>window.innerWidth?s.initMap("40.0902","-98.7129",3,!1):s.initMap("40.0902","-110.7129",4,!1),$(".info-cdc").addClass("none")},openInfoWin:function(e,t){google.maps.event.addListener(e,"click",function(){var o=new google.maps.InfoWindow({content:t});o.open(e.get("map"),e)})}},r=sessionStorage.getItem("zip");if(r)var i=!0;else var i=!1;window.innerHeight>window.innerWidth?s.initMap("40.0902","-98.7129",3,!1,i):s.initMap("40.0902","-110.7129",4,!1,i),o.get(n+"/states").success(function(t,o,n,s){e.stateList=t,e.infoDataBox={surveys:t[0].data.total_surveys,nosymptoms:t[0].data.no_symptoms,nosymptomspercent:t[0].data.none_percentage,symptoms:t[0].data.symptoms,symptomspercent:t[0].data.symptoms_percentage,flulike:t[0].data.ili,flulikepercent:t[0].data.ili_percentage}}),e.updateInfoDataBox=function(){var t=JSON.parse(sessionStorage.getItem("centerMap")),o=Number(sessionStorage.getItem("zoomMap")),n=t.latitude,r=t.longitude;e.infoDataBox=JSON.parse(sessionStorage.getItem("objDataSurvey")),s.initMap(n,r,o),e.$apply()},t.$on("updateInfoDataBox",e.updateInfoDataBox),e.hideMarkers=function(){s.hideMarkers()},e.showMarkers=function(){s.showMarkers()},o.get(n+"/flu-news.json?FNY_Site=flunearyou.org").success(function(t,o){e.news=t}),e.showReadMore=!0,e.tab1=!0,e.tab2=!1,e.changeTab=function(t){"tab1"==t?(e.tab1=!0,e.tab2=!1):(e.tab1=!1,e.tab2=!0)}})}]),app.controller("navCtrl",["$scope","$rootScope","$translate",function(e,t,o){e.isLogged=function(){if(localStorage.getItem("userLogged")){var t=JSON.parse(localStorage.getItem("userLogged"));e.userLogged=!0,e.userLoggedEmail=t.email}else e.userLogged=!1,e.userLoggedEmail=""},t.$on("IS_LOGGED",e.isLogged),e.logout=function(){e.custom=!1,localStorage.removeItem("userLogged"),t.$emit("IS_LOGGED")},e.custom=!1,e.toggleCustom=function(){e.custom=e.custom===!1},e.changeLanguage=function(e){o.use(e)}}]),app.controller("homeCtrl",["$scope","$rootScope","$http","$urlBase","$window","session",function(e,t,o,n,s,r){r.then(function(){e.isLogged=function(){var e=localStorage.getItem("userLogged");e?$(".btn-cta").addClass("none"):$(".btn-cta").removeClass("none")},t.$on("IS_LOGGED",e.isLogged),e.scrolltop=function(){document.body.scrollTop=document.documentElement.scrollTop=0},t.$on("SCROLL_TOP",e.scrolltop),t.$emit("IS_LOGGED"),t.$emit("NEWS"),t.$emit("SCROLL_TOP"),e.mapZipCode=function(e){sessionStorage.setItem("zip",e),s.location.href="#/map"},o.get(n+"/states").success(function(t,o,n,s){e.stateList=t,e.infoDataBox={surveys:t[0].data.total_surveys,nosymptoms:t[0].data.no_symptoms,nosymptomspercent:t[0].data.none_percentage,symptoms:t[0].data.symptoms,symptomspercent:t[0].data.symptoms_percentage,flulike:t[0].data.ili,flulikepercent:t[0].data.ili_percentage}}),o.get(n+"/flu-news.json?FNY_Site=flunearyou.org").success(function(t,o){e.news=t}),e.showReadMore=!0,e.tab1=!0,e.tab2=!1,e.changeTab=function(t){"tab1"==t?(e.tab1=!0,e.tab2=!1):(e.tab1=!1,e.tab2=!0)}})}]),app.controller("aboutCtrl",["$scope","session",function(e,t){t.then(function(){$rootScope.$emit("SCROLL_TOP")})}]),app.controller("fluNewsCtrl",["$scope","$http","$urlBase","$window","$rootScope","session",function(e,t,o,n,s,r){r.then(function(){s.$emit("IS_LOGGED"),s.$emit("SCROLL_TOP"),e.news=function(){t.get(o+"/flu-news.json?FNY_Site=flunearyou.org").success(function(t,o){e.news=t}),e.showReadMore=!0,-1!=n.location.href.indexOf("flu-news")&&(e.showReadMore=!1)},s.$on("NEWS",e.news),s.$emit("NEWS")})}]),app.controller("pressCtrl",["$scope","$http","$urlBase","session",function(e,t,o,n){n.then(function(){t.get(o+"/press.json").success(function(t,o){for(var n=[],s=[],r=0;r<t.length;r++){var i=t[r];"2015"==i.publicationDateYear?n.push(i):s.push(i)}e.press2015=n,e.press2014=s}).error(function(e,t){console.log(e)})})}]),app.controller("modalsCtrl",["$scope","$rootScope","$http","$urlBase","$window","$fny","Facebook","GooglePlus",function(e,t,o,n,s,r,i,a){e.resgisterSocial=!0,e.toggleResgisterSocial=function(){i.login(function(t){"connected"==t.status&&(e.resgisterSocial=e.resgisterSocial===!1)})},e.login=function(e,t,o){var n={email:e,password:t};r.login(n)},e.checkIfEnterKeyWasPressed=function(t,o,n){13==n.keyCode&&e.login(t,o,n)},e.loginFacebook=function(){i.login(function(e){if("connected"==e.status){var s=e.authResponse.accessToken;o.post(n+"/user/login/facebook",{access_token:s}).success(function(e,o,n){if(200==o){var s=e.info.basic.nickname,r=e.info.basic.token,i=e.info.basic.email,a={name:s,email:i,token:r};localStorage.setItem("userLogged",JSON.stringify(a)),t.$emit("IS_LOGGED"),$(".modal").modal("hide")}}).error(function(e,t,o){})}})},e.loginGooglePlus=function(){a.login().then(function(e){if(1==e.status.google_logged_in){var s=e.access_token;o.post(n+"/user/googleplus",{access_token:s}).success(function(e,o,n){if(console.log(e),200==o){var s=e.info.token,r=e.info.email,i={email:r,token:s};localStorage.setItem("userLogged",JSON.stringify(i)),t.$emit("IS_LOGGED"),$(".modal").modal("hide")}}).error(function(e,t,o){})}a.getUser().then(function(e){console.log(e)})},function(e){console.log(e)})},e.sendNewUser=function(){var t=e.newUser;return void 0==t.gender?(e.isGenderValid=!1,e.errorMsg="Gender is empty"):r.registerNewUser(t),!1},e.registerFacebook=function(e){i.api("/me",function(e){console.log(e);e.authResponse.accessToken})},e.isEmailValid=!0,e.isZipEmpty=!0,e.isPassEmpty=!0,e.isYearEmpty=!0,e.isGenderValid=!0,e.validaEmail=function(t){var o=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.isEmailValid=o.test(t),e.errorMsg="Email invalid",e.isEmailValid},e.passEmpty=function(t){""==t||void 0==t||null==t||t.length<3||t.length>12?(e.isPassEmpty=!1,e.errorMsg="Password must have bettwen 3 and 12 caracters"):e.isPassEmpty=!0},e.zipEmpty=function(t){var o=String(t);""==o||void 0==o||null==o||o.length<5||o.length>5?(e.errorMsg="Zip code must have 5 characters",e.isZipEmpty=!1):e.isZipEmpty=!0},e.yearEmpty=function(t){var o=String(t);""==o||void 0==o||null==o||o.length<4||o.length>4?(e.errorMsg="Year must have 4 characters",e.isYearEmpty=!1):e.isYearEmpty=!0}}]),app.controller("reportCtrl",["$scope","$rootScope","$window","$location","$uibModal","reportApi","userApi","session",function(e,t,o,n,s,r,i,a){a.then(function(){$("#modal-join-us, #modal-login").modal("hide"),t.$emit("IS_LOGGED"),t.$emit("SCROLL_TOP"),e.optionsDate=new Date,e.options={format:"dd/mm/yy",selectYears:!0},e.page_members=!1,e.page_symptoms=!1,e.page_vaccionations=!1,e.page_more_members=!1,e.vaccinations=[],e.members=[],e.members_ids=[],e.selected_ids=[],e.current_id=null,e.survey={symptoms:[]},e.travel_where=null,e.checks=[],e.checks_perm=[];var o=new Date,a=o.getDay(),l=o.getDate()-7-a+(0==a?-6:1);e.week_of=new Date(o.setDate(l)),e.week_end=new Date(o.setDate(l+6)),e.next_week=new Date(o.setDate(l+7));var c=function(){s.open({templateUrl:"views/partials/modal-thanks.html",controller:"ModalThanksCtrl",size:"lg",resolve:{items:function(){return e.items}}})},u=function(t){e.page_members="page_members"==t,e.page_symptoms="page_symptoms"==t,e.page_vaccionations="page_vaccionations"==t,e.page_more_members="page_more_members"==t},p=function(){i.getUser(function(t){t.info&&(e.user=t.info.basic,e.user_vaccionations=t.info.vaccinations,e.households=t.info.household,e.households.length>=1?u("page_members"):(u("page_symptoms"),e.selected_ids=[e.user.user_id],e.current_id=e.user.user_id),e.members_ids.push(e.user.user_id),angular.forEach(e.households,function(t,o){e.members_ids.push(t.user_household_id)}))})};e.termometro=!0,e.teste=function(){e.termometro=e.termometro===!1};var d=function(){r.getChecks(function(t){t&&(e.checks=t.checks,e.members=t.checks,e.checks_perm=t.checks_perm)})},m=function(){r.getReportsThisWeek(function(t){t&&(e.reports_this_week=t)})},g=function(){c(),n.path("/map")},f=function(){0==e.households.length&&"N"!=e.user.more_members?u("page_more_members"):g()},h=function(){e.user.current_survey||"Y"==e.user_vaccionations.is_vaccinated?f():u("page_vaccionations")};e.goBack=function(){u("page_members")},e.everyoneHealthy=function(){r.everyoneHealthy(function(e){e&&h()})},e.selectMembers=function(){e.members.length>0?(e.selected_ids=e.members.slice(),e.openSymtoms()):e.error="You must select at least one member"},e.openSymtoms=function(){e.members.length<=0?h():(u("page_symptoms"),e.current_id=e.members.shift(),angular.forEach(e.households,function(t,o){t.user_household_id==e.current_id&&(e.user_name=t.nickname)}))},e.sendReport=function(){if(0==e.survey.symptoms.length)return void(e.error_symptom=!0);var t=e.members_ids.indexOf(e.current_id);t>-1&&e.members_ids.splice(t,1),r.sendReport(e.survey,e.user.user_id,e.current_id,e.members_ids,e.user.current_survey,function(t){e.openSymtoms()})},e.sendVaccine=function(){if(e.vaccinations.user&&e.vaccinations.user.hasOwnProperty(e.user.user_id)){var t={flu_vaccine:e.vaccinations.user[e.user.user_id],user_id:e.user.user_id,user_household_id:null};r.sendVaccine(t,function(){})}if(e.vaccinations.user&&e.vaccinations.user.hasOwnProperty(e.user.user_id))for(var o in e.vaccinations.household)e.vaccinations.household.hasOwnProperty(o)&&(t={flu_vaccine:e.vaccinations.household[o],user_id:e.user.user_id,user_household_id:o},r.sendVaccine(t,function(){}));f()},e.sendReminder=function(e){"Y"==e?n.path("/settings"):"N"==e?r.sendReminder(function(e){g()}):g()},p(),d(),m()})}]),app.controller("surveyCtrl",["$scope","$rootScope","$window","session","$uibModal",function(e,t,o,n,s){n.then(function(){t.$emit("IS_LOGGED"),t.$emit("SCROLL_TOP"),e.optionsDate=new Date,e.options={format:"dd/mm/yy",selectYears:!0},e.disabledSymptoms=!1,e.toggleDisabledSymptoms=function(){e.temperature=!1,e.disabledSymptoms=e.disabledSymptoms===!1},e.temperature=!1,e.toggleTemperature=function(){e.temperature=e.temperature===!1},e.treveling=!1,e.toggleTreveling=function(){e.treveling=e.treveling===!1},e.sendSurvey=function(){o.location.href="#/map"}})}]),app.controller("settingCtrl",["$scope","$http","$urlBase","$uibModal","$timeout","$translate","$rootScope","$route","growl","userApi","householdApi","session",function(e,t,o,n,s,r,i,a,l,c,u,p){p.then(function(){if(i.$emit("IS_LOGGED"),i.$emit("SCROLL_TOP"),e.showUserUpdate=!1,e.households=[],!localStorage.getItem("userLogged"))return!1;var t=JSON.parse(localStorage.getItem("userLogged"));t.token;e.openModalConfirm=function(t){n.open({animation:e.animationsEnabled,templateUrl:"views/partials/modal-confirm-activation.html",controller:"ModalActivationCtrl",resolve:{household:function(){return t},getHouseholds:function(){return a}}})},e.openModalEdit=function(t){n.open({animation:e.animationsEnabled,templateUrl:"views/partials/modal-edit-household.html",controller:"ModalEditHouseholdCtrl",resolve:{household:function(){return t},getHouseholds:function(){return a}}})};var o=function(e){"es"==r.proposedLanguage()&&e.message_es?l.addSuccessMessage(e.message_es):l.addSuccessMessage(e.message)},s=function(){c.getUser(function(t){e.user=t.info.basic,e.user.zip=t.info.place.zip;var o=e.user.dob.indexOf("/");e.user.birthyear=e.user.dob.slice(o+1),e.user.birthmonth=e.user.dob.slice(0,o)})},a=function(){u.getHuseholds(function(t){t.household&&(e.households=t.household)})};e.sendNewHousehold=function(){console.log(e.newHousehold),u.sendNewHousehold(e.newHousehold,function(t){t&&(a(),e.addMember=!1,i.$emit("SCROLL_TOP"),o(t))})},e.userEdit=function(){c.userEdit(e.user,function(t){t&&(e.showUserUpdate=!1,e.user.dob=e.user.birthmonth+"/"+e.user.birthyear,o(t))})},e.sendPassword=function(){var t={old_password:e.old_password,password:e.password,confirm_password:e.confirm_password};c.sendPassword(t,function(t){t&&(e.changePass=!1,o(t))})},s(),a()})}]),app.controller("unsubscribeCtrl",["$scope","$http","$urlBase","$window","$timeout","$rootScope","session",function(e,t,o,n,s,r,i){i.then(function(){var i=JSON.parse(localStorage.getItem("userLogged")),a=i.token;e.sendUnsubscribe=function(i,l){var c={token:a,pauseoption:i,reason:l};t.post(o+"/user/unsubscribe?t="+a,c).success(function(t,o){e.unsubscribeSuccess=!0,s(function(){e.unsubscribeSuccess=!1,n.location.href="/#",localStorage.removeItem("userLogged"),r.$emit("IS_LOGGED")},1e3)})}})}]),app.controller("ModalThanksCtrl",["$scope","$uibModalInstance","items","$http","$urlBase",function(e,t,o,n,s){if(!localStorage.getItem("userLogged"))return!1;var r=JSON.parse(localStorage.getItem("userLogged")),i=r.token;n.get(s+"/stats.json",{headers:{token:i}}).success(function(t){e.reportCard=t}),e.ok=function(){t.close(e.selected.item)},e.cancel=function(){t.dismiss("cancel")}}]),app.controller("ModalActivationCtrl",["$scope","$uibModalInstance","$translate","growl","householdApi","household","getHouseholds",function(e,t,o,n,s,r,i){e.household=r;var a=function(e){"es"==o.proposedLanguage()&&e.message_es?n.addSuccessMessage(e.message_es):n.addSuccessMessage(e.message)};e.ok=function(){t.close()},e.cancel=function(){t.dismiss("cancel")},e.sendActivation=function(){s.sendActivation(e.household,function(t){t&&(e.ok(),i(),a(t))})}}]),app.controller("ModalEditHouseholdCtrl",["$scope","$uibModalInstance","$translate","growl","householdApi","household","getHouseholds",function(e,t,o,n,s,r,i){e.household=r;var a=e.household.dob.indexOf("/");e.household.birthyear=e.household.dob.slice(a+1),e.household.birthmonth=e.household.dob.slice(0,a);var l=function(e){"es"==o.proposedLanguage()&&e.message_es?n.addSuccessMessage(e.message_es):n.addSuccessMessage(e.message)};e.ok=function(){t.close()},e.cancel=function(){t.dismiss("cancel")},e.sendHouseholdEdit=function(){s.sendHouseholdEdit(e.household,function(t){t&&(e.ok(),i(),l(t))})}}]),app.controller("healthReportCtrl",["$scope","$rootScope","$http","$urlBase","session",function(e,t,o,n,s){s.then(function(){if(!localStorage.getItem("userLogged"))return!1;var s=JSON.parse(localStorage.getItem("userLogged")),r=s.token;t.$emit("IS_LOGGED"),t.$emit("SCROLL_TOP"),o.get(n+"/stats.json",{headers:{token:r}}).success(function(t){e.reportCard=t}),o.get(n+"/reports.json",{headers:{token:r}}).success(function(t){console.log(t),e.healthReports=t,e.healthReportsSurveys=t.surveys})})}]),app.directive("chooseStateDirective",["$rootScope","$window","$timeout",function(e,t,o){return{restrict:"A",link:function(n,s){s.on("change",function(){t.location.href="#/map";var n=s.find(":selected"),r=Number(n.attr("data-surveys")),i=Number(n.attr("data-nosymptoms")),a=Number(n.attr("data-nosymptomspercent")),l=Number(n.attr("data-symptoms")),c=Number(n.attr("data-symptomspercent")),u=Number(n.attr("data-flulike")),p=Number(n.attr("data-flulikepercent")),d=Number(n.attr("data-lat")),m=Number(n.attr("data-lon")),g=n.attr("value"),f=n.attr("data-color"),h=n.attr("value").replace(" ","-"),v={surveys:r,nosymptoms:i,nosymptomspercent:a,symptoms:l,symptomspercent:c,flulike:u,flulikepercent:p},y={latitude:d,longitude:m},b={latitude:40.0902,longitude:-110.7129},w={color:f,image:h},_=_="United States"==g?4:6,S=S="United States"==g?b:y;localStorage.setItem("showFluMap","true"),e.$emit("SHOWFLUMAP"),sessionStorage.setItem("objDataSurvey",JSON.stringify(v)),sessionStorage.setItem("centerMap",JSON.stringify(S)),sessionStorage.setItem("zoomMap",_),o(function(){$(".wrapper-databox-image").css({background:""+w.color+" url(images/states/"+w.image+".png) no-repeat center center"}),e.$emit("updateInfoDataBox")},500)})}}}]),app.directive("temperature",function(){return{restrict:"A",link:function(e,t){var o=function(e,t){var o=$(".ui-slider-handle").position().left;t.value,$(".ui-slider-handle").position().left;if($("#thermometer_bg").width(o),t.value>1){var n=(99.7+t.value/10).toFixed(1);n>=101?($("#text-slider").html("greater than"+n+" ºF"),$("#fever_f").val(101),$("#thermometer_bg").addClass("hight")):99.9==n?($("#text-slider").html("less than 99.9 ºF"),$("#fever_f").val(99.9),$("#thermometer_bg").removeClass()):($("#text-slider").html(n+" ºF"),$("#fever_f").val(n),$("#thermometer_bg").removeClass())}else $("#text-slider").html("")};t.slider({range:!1,min:1,max:13,step:1,animate:!1,value:2,slide:o,change:o}),$("#text-slider").html("less than 99.9 ºF")}}}),app.directive("disabledSurvey",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){var t=e.disabledSymptoms;t?$(".disabled").find("input").attr("disabled",!0).attr("checked",!1):$(".disabled").find("input").attr("disabled",!1)})}}}),app.directive("showTraveling",function(){return{restrict:"A",link:function(e,t){t.find("input").on("click",function(){var e=$("#conditional input").is(":checked");e?$(".fieldset-traveling").removeClass("none"):$(".fieldset-traveling").addClass("none")})}}}),app.directive("removeOption",function(){return{restrict:"A",link:function(e,t){setTimeout(function(){t.find("option").eq(0).remove()},1e3)}}}),app.directive("selectLanguage",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){t.toggleClass("opened")}),t.find(".lng").on("click",function(){$(this).attr("data-lng");t.find(".lng").removeClass("ativo"),$(this).addClass("ativo")})}}}),app.directive("loadingButton",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){$(this).button("loading"),setTimeout(function(){$(".btn-login, .btn-loading").button("reset")},2e3)})}}}),app.directive("autoComplete",function(){return{restrict:"A",link:function(e,t){setTimeout(function(){t.chosen({})},1500)}}}),app.directive("openMenuMobile",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){$("#btn-menu-mobile").toggleClass("ativo"),$("#btn-menu-mobile").hasClass("ativo")?$(".nav-mobile").animate({height:"360px"},"slow"):$(".nav-mobile").animate({height:"0"},"slow")})}}}),app.directive("showHideData",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){$(this).toggleClass("ativo"),$(this).hasClass("ativo")?($(this).find("button").text("HIDE DATA"),$("#databox-mobile").animate({height:"385px"},"slow")):($(this).find("button").text("SHOW DATA"),$("#databox-mobile").animate({height:"0"},"slow"))})}}}),app.directive("uiCalender",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){var t=e.week_of;if(e.user.current_survey){if(e.user.first_survey)var o=t;else var o=t.setDate(t.getDate()+7);var n=new Date,s=new Date}else var o=t,n=e.week_end,s=new Date(o);e.date_default=s,console.log("min",o),console.log("max",n),console.log("date_default",s),$("#date_input").pickadate({min:o,max:n,format:"dddd, mmmm d yyyy"});var r=$("#date_input").pickadate("picker");null!=r&&r.set("select","Mon May 02 2016 00:00:00 GMT-0300 (BRT)")})}}}),app.directive("search",function(){return{restrict:"A",link:function(e,t){t.on("keyup",function(){var e=$(this).val(),t=0;$("#questions ul li").each(function(){$(this).text().search(new RegExp(e,"i"))<0?$(this).fadeOut():($(this).show(),t++)});var o=t;$("#count-results").text(o)})}}}),app.directive("accordion",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){var e=$(this).find("p").height();$(this).toggleClass("open"),$(this).hasClass("open")?($(this).animate({height:e+140},200),$(this).find("span").css("transform","rotate(45deg)")):($(this).animate({height:"80px"},200),$(this).find("span").css("transform","rotate(0deg)"))})}}}),app.directive("symptomsList",["$sce",function(e){return{restrict:"A",link:function(e,t){var o=[];1==e.report.fever&&o.push("fever"),1==e.report.cough&&o.push("cough"),1==e.report.headache&&o.push("headache"),1==e.report.sorethroat&&o.push("sorethroat"),1==e.report.diarrhea&&o.push("diarrhea"),1==e.report.bodyache&&o.push("bodyache"),1==e.report.fatigue&&o.push("fatigue"),1==e.report.chills&&o.push("chills"),1==e.report.nausea&&o.push("nausea"),1==e.report.breath&&o.push("breath"),e.report.symptoms=o}}}]),app.directive("editHousehold",["$rootScope",function(e){return{restrict:"A",link:function(t,o){o.on("click",function(){var t=$(this).attr("data-nick"),o=$(this).attr("data-gender"),n=$(this).attr("data-niver"),s=$(this).attr("data-id"),r=n.indexOf("/"),i=(n.slice(r+1),n.slice(0,r),{id:s,nickname:t,gender:o,niver:n});localStorage.setItem("objHouseholdEdit",JSON.stringify(i)),e.$emit("updateHousehold")})}}}]),app.directive("openHealph",function(){return{restrict:"A",link:function(e,t){t.on("click",function(){$(this).toggleClass("heightAuto"),$(this).hasClass("heightAuto")?$(this).find("span").css("transform","rotate(-45deg)"):$(this).find("span").css("transform","rotate(0deg)")})}}}),app.service("dataService",["$scope","socket",function(e,t){var t=io.connect(),o={},n=[];return o.getFeeds=function(e){t.on("stream",function(t){n=t,e(t)})},o}]),app.service("cdcstates",["$http",function(e){var t={},o=[];return t.getStates=function(t){e.get("../assets/states.geo.json").success(function(e){o=e,t(e)}).error(function(e){console.log("Error getStates: ",e)})},t.getMarkers=function(t){e.get("https://flunearyou.org/home.json").success(function(e){o=e,t(e)}).error(function(e){console.log("Error getMarkers: ",e)})},t}]),app.service("reportApi",["$http","$urlBase","$rootScope","$window","$timeout","$uibModal",function(e,t,o,n,s,r){var i={},a=JSON.parse(localStorage.getItem("userLogged"));return a=a?JSON.parse(localStorage.getItem("userLogged")).token:"",i.getChecks=function(o){e.get(t+"/checks.json",{headers:{token:a}}).success(function(e){o(e)}).error(function(e){console.log("Error getChecks: ",e)})},i.getReportsThisWeek=function(o){e.get(t+"/reports-this-week.json",{headers:{token:a}}).success(function(e){o(e)}).error(function(e){console.log("Error getReportsThisWeek: ",e)})},i.everyoneHealthy=function(o){e.post(t+"/survey/all",{},{headers:{token:a}}).success(function(e){o(!0)}).error(function(e){console.log("Error getUser: ",e)})},i.sendReport=function(o,n,s,r,i,l){var c=i?t+"/survey/now":t+"/survey/new",u=0==o.symptoms.length?1:0,p={platform:"web",user_id:n,current_member:s,healthy_members:r.join(),no_symptoms:u};o.ill_date&&(p.ill_date=new Date(o.ill_date).toISOString().substring(0,10)),o.was_traveling&&(p.traveling="Y",p.travel_where=o.travel_where),angular.forEach(o.medical,function(e,t){p[t]="Y"}),angular.forEach(o.symptoms,function(e,t){p[e]=1}),e.post(c,p,{headers:{token:a}}).success(function(e){l(!0)}).error(function(e){console.log("Error sendReport: ",e)})},i.sendVaccine=function(o,n){o.token=a,e.post(t+"/survey/vaccine",o,{headers:{token:a}}).success(function(e){n(!0)}).error(function(e){console.log("Error sendVaccine: ",e)})},i.sendReminder=function(o){e.post(t+"/user/reminder/disable",{},{headers:{token:a}}).success(function(e){o(!0)}).error(function(e){console.log("Error sendReminder: ",e)})},i}]),app.service("$fny",["$http","$urlBase","$rootScope","$window","$timeout",function(e,t,o,n,s){var r={login:function(s){e.post(t+"/user/login",s).success(function(e,t){var s=e.info.basic,r=e.info.basic.token,i={name:s.nickname,email:s.email,token:s.token};localStorage.setItem("userLogged",JSON.stringify(i)),o.$emit("IS_LOGGED"),n.location.href="#/report?token="+r}).error(function(e,t){console.log(t)})},registerNewUser:function(o){var n=localStorage.getItem("campaign");n&&(o.apha_num=n),e.post(t+"/user",o).success(function(e,t){var n={email:o.email,password:o.password};r.login(n)}).error(function(e,t){console.log(e),console.log(t)})}};return r}]),app.service("userApi",["$http","$urlBase","$rootScope","$window","$timeout",function(e,t,o,n,s){var r={},i=JSON.parse(localStorage.getItem("userLogged"));return i=i?JSON.parse(localStorage.getItem("userLogged")).token:"",r.getUser=function(o){i&&e.get(t+"/user",{headers:{token:i}}).success(function(e){o(e)}).error(function(e){console.log("Error getUser: ",e)})},r.userEdit=function(o,n){var s={nickname:o.nickname,email:o.email,gender:o.gender,zip:o.zip,birthmonth:o.birthmonth,birthyear:o.birthyear};e.post(t+"/user/update",s,{headers:{token:i}}).success(function(e){n(e)}).error(function(e){console.log("Error userEdit: ",e)})},r.sendPassword=function(o,n){e.post(t+"/user/update/password",o,{headers:{token:i}}).success(function(e){n(e)}).error(function(e){console.log("Error sendPassword: ",e)})},r}]),app.service("householdApi",["$http","$urlBase","$rootScope","$window","$timeout",function(e,t,o,n,s){var r={},i=JSON.parse(localStorage.getItem("userLogged"));return i=i?JSON.parse(localStorage.getItem("userLogged")).token:"",r.getHuseholds=function(o){i&&e.get(t+"/user/household",{headers:{token:i
}}).success(function(e){o(e)}).error(function(e){console.log("Error getHuseholds: ",e)})},r.sendActivation=function(o,n){var s="Y"==o.active?"deactivate":"activate";e.post(t+"/user/household/"+s,{user_household_id:o.user_household_id},{headers:{token:i}}).success(function(e){n(e)}).error(function(e){console.log("Error sendActivate: ",e)})},r.sendHouseholdEdit=function(o,n){var s={nickname:o.nickname,gender:o.gender,user_household_id:o.user_household_id,birthyear:o.birthyear,birthmonth:o.birthmonth};e.post(t+"/user/household/update",s,{headers:{token:i}}).success(function(e,t){n(e)}).error(function(e,t){console.log("Error sendHouseholdEdit: ",error)})},r.sendNewHousehold=function(o,n){e.post(t+"/user/household",o,{headers:{token:i}}).success(function(e,t){n(e)}).error(function(e,t){console.log("Error sendNewHousehold: ",error)})},r}]);