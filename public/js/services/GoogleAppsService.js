/**
 * Created by thuy on 28/01/16.
 */
angular.module('GoogleAppsService', []).factory('androidApps', ['$http', function($http) {

    return {
        // call to get 10 top free apps
        get : function(url) {
            return $http.get(url)
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    return err;
                });
        },

        // call to delete all apps in db
        delete: function() {
            return $http.delete('/api/apps/android');
        },

        // scrape and update play store data
        create: function() {
            return $http.post('/api/apps/android', "");
        }
    }
}]);
