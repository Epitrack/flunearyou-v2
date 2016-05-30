app.factory( 'session', ['$http', '$urlBase', '$routeParams', '$q', function GetSession($http, $urlBase, $routeParams, $q){
    var defer = $q.defer();

    var tokenTracings = function(token){
        console.log('token', token);
        // TO DO: implement function
        return true;
    }

    var languageTracings = function(language){
        console.log('language', language);
        // TO DO: implement function
        return true;
    }

    var emailTracings = function(track_id){
        console.log('track_id', track_id);
        // TO DO: implement function
        return true;
    }

    var campaignTracings = function(campaign){
        console.log('campaign', campaign);
        // TO DO: implement function
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