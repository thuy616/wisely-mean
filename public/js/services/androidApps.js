/**
 * Created by thuy on 28/01/16.
 */

angular.module('androidApps', []).factory('andoirdApps', ['$http', function($http) {
    return

    $http.get('/api/apps/android')
        .success(function(data) {
            console.log("success...");
            return data;
        })
        .error(function(err) {
            return err;
        });


}]);

//app.factory('androidApps', ['$http', function($http) {
//
//    return
//
//    $http.get('/api/apps/android')
//            .success(function(data) {
//                console.log("success...");
//                return data;
//            })
//            .error(function(err) {
//                return err;
//            });


    //{
        // //call to get 10 top free apps
        //get : function() {
        //    return $http.get('/api/apps/android')
        //        .success(function(data) {
        //            console.log("success...");
        //            return data;
        //        })
        //        .error(function(err) {
        //            return err;
        //        });
        //},
        //
        //// call to delete all apps in db
        //delete: function() {
        //    return $http.delete('/api/apps/android');
        //},
        //
        //// scrape and update play store data
        //create: function() {
        //    return $http.post('/api/apps/android', "");
        //}
    //}
//}]);
