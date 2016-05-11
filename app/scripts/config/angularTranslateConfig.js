/*
*	Angular translate setup
*/
'use strict';

app.config(['$translateProvider',function($translateProvider) {
	$translateProvider
	.translations('en', JSON.parse(localStorage.getItem('translations_en')))
	.translations('es', JSON.parse(localStorage.getItem('translations_es')))
	.preferredLanguage('en');
}]);