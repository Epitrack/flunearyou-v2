/*
*	Angular translate setup
*/
'use strict';

app.config(['$translateProvider', function($translateProvider) {
	if (sessionStorage.getItem('translations_en') && sessionStorage.getItem('translations_es')){
		
		$translateProvider
			.translations('en', JSON.parse(sessionStorage.getItem('translations_en')))
			.translations('es', JSON.parse(sessionStorage.getItem('translations_es')))
			.preferredLanguage('en')
			.useSanitizeValueStrategy(null);

	}else{
		
		$.get('http://dev.flunearyou.org/translations').success(function(data, status){
			sessionStorage.setItem('translations_en', JSON.stringify(data.translations.en));
			sessionStorage.setItem('translations_es', JSON.stringify(data.translations.es));
			
			$translateProvider
				.translations('en', JSON.stringify(data.translations.en))
				.translations('es', JSON.stringify(data.translations.es))
				.preferredLanguage('en')
				.useSanitizeValueStrategy(null);
			
			window.location.reload();

		}).error(function(data, status){
			console.log('Error in angularTranslateConfig.js');
			console.log(data, status);
		});
	}

	
}]);