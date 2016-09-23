/*
*	Facebook Config
*/

'use strict';

app.config(['FacebookProvider',function(FacebookProvider) {
	var url = window.location.href;

	if (url.indexOf('localhost') != -1){
		// var FBid = '362068090500998';
		var FBid = '199700630106025';
	}else{
		// DEV
		// var FBid = '463215990541721';

		// PROD
		var FBid = '199700630106025';

		// Localhost
		// var FBid = '362068090500998';
	}
	FacebookProvider.init(FBid);
}]); 