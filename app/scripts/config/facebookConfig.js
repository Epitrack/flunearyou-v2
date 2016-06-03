/*
*	Facebook Config
*/

'use strict';

app.config(['FacebookProvider',function(FacebookProvider) {
	var url = window.location.href;

	if (url.indexOf('localhost') != -1){
		var FBid = '362068090500998';
	}else{
		var FBid = '199700630106025';
	}

	FacebookProvider.init(FBid);
}]); 