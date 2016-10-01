/*
*	Angular translate setup
*/
'use strict';

app.config(['$translateProvider', function($translateProvider) {

	if (!localStorage.getItem('lng')) {
		localStorage.setItem('lng', 'en');
	}

	var language = localStorage.getItem('lng');

	// Remove DB
	// fnyDB.get('translations').then(function(data) {
	// 	fnyDB.remove(data);
	// });

	
	console.log('fnyDB.get(translate)');
	fnyDB.get('translate').then(function(data){
		$translateProvider
			.translations('en', data.en)
			.translations('es', data.es)
			.preferredLanguage(language)
			.useSanitizeValueStrategy(null);
	}).catch(function(err){
		$.get('http://dev.flunearyou.org/translations').success(function(data, status){
			var lngEN = JSON.stringify(data.translations.en),
				lngES = JSON.stringify(data.translations.es);

			fnyDB.put({
				_id : 'translate',
				en  : lngEN,
				es  : lngES
			});

			window.location.reload();
		}).error(function(data, status){
			console.log('Error in angularTranslateConfig.js');
			console.log(data);
			console.log(status);
		});
	});
}]);