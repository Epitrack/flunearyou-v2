/*
*	Loading bar
*/ 

'use strict';

app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
}]);