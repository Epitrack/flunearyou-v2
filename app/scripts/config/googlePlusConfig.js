/*
*	Google Plus Config
*/

'use strict'; 

app.config(['GooglePlusProvider',function(GooglePlusProvider) {
	GooglePlusProvider.init({
        clientId: '736037612174-lpmdhpfcfane9p9cvqb9d6lkc5fc15mr.apps.googleusercontent.com',
        apiKey: 'Tpwrqg_jpW-qIZJPBDNeJu14',
        scopes:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
     });
}])