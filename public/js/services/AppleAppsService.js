/**
 * Created by thuy on 28/01/16.
 */
angular.module('AppleAppsService', []).factory('iosApps', ['$http', function($http) {

    return {
        // call to get 10 top free apps and 10 top paid apps
        get : function(url) {
            return $http.get(url)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        }
    }
}]);