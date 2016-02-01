/**
 * Created by thuy on 28/01/16.
 */
angular.module('iosApps', []).factory('iosApps', ['$http', function($http) {

    return

    $http.get('/api/apps/ios?filter=top_free_apps')
        .success(function(data) {
            console.log("success...");
            return data;
        })
        .error(function(err) {
            return err;
        });



    //{
        //// call to get 10 top free apps and 10 top paid apps
        //get : function() {
        //    return $http.get('/api/apps/ios?filter=top_free_apps')
        //        .success(function(data) {
        //            console.log("success");
        //            console.log(data);
        //            return data;
        //        })
        //        .error(function(err) {
        //            return err;
        //        });
        //}
    //}
}]);