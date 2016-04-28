/*
*	Config Flu-map
*/

'use strict';

app.config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
	GoogleMapApiProviders.configure({
		china: true
	});
}]);