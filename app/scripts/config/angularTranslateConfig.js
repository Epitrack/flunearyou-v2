/*
*	Angular translate setup
*/
'use strict';

app.config(['$translateProvider', function($translateProvider) {

	$.get('http://dev.flunearyou.org/translations').success(function(data, status){
		localStorage.setItem('translations_en', JSON.stringify(data.translations.en));
		localStorage.setItem('translations_es', JSON.stringify(data.translations.es));
	}).error(function(data, status){
		console.log('Error in angularTranslateConfig.js');
		console.log(data, status);
	});


	$translateProvider
	.translations('en', JSON.parse(localStorage.getItem('translations_en')))
	.translations('es', JSON.parse(localStorage.getItem('translations_es')))
	.preferredLanguage('en')
	.useSanitizeValueStrategy(null);

	
}]);