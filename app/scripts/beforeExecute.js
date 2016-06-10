app.factory( 'session', ['$http', '$urlBase', '$routeParams', '$q', '$rootScope', '$window', '$translate', '$localStorage',
    function GetSession($http, $urlBase, $routeParams, $q, $rootScope, $window, $translate, $localStorage){
    var defer = $q.defer();

    var tokenTracings = function(token){
        $http.get($urlBase+'/user', {headers: {'token': token}}).success(function(data, status){
            var nickname  = data.info.basic.nickname,
                userToken = data.info.basic.token,
                userEmail = data.info.basic.email,
                userLoggedObj = {
                    'name'  : nickname,
                    'email' : userEmail,
                    'token' : userToken
                };
                
                localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
                $rootScope.$emit("IS_LOGGED");
                $window.location.href = '#/report?token='+userToken;
        }).error(function(data, status){ console.log(status) });
        return true;
    }

    var languageTracings = function(language){
        $translate.use(language);
        $localStorage.language = language;
        return true;
    }

    var emailTracings = function(track_id){
        console.log('track_id', track_id);
        // $http.get($urlBase+'/email/tracking/view?track_id='+track_id, {headers: {'token': token}}).success(function(data, status){
        //     localStorage.setItem('track_id', track_id);
        // }).error(function(data, status){ console.log(status) });
        return true;
    }

    var campaignTracings = function(campaign){
        console.log('campaign', campaign);
        localStorage.setItem('campaign', campaign);
        return true;
    }


    if ($routeParams.token){
        tokenTracings($routeParams.token)
    }

    if ($routeParams.language){
        languageTracings($routeParams.language)
    }

    if ($routeParams.track_id){
        emailTracings($routeParams.track_id)
    }

    if ($routeParams.campaign){
        campaignTracings($routeParams.campaign)
    }
   
    defer.resolve('done');
    return defer.promise;
}]);