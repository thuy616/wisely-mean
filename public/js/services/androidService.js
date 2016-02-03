/**
 * Created by thuy on 28/01/16.
 */

angular.module('androidService', []).factory('androidService', ['$http', function($http) {


    return {
        // call to get all android apps
        get: function () {
            console.log("calling the backend api - get all android apps!");
            return $http.get('/api/apps/android')
                .success(function (data) {

                    return processData(data);
                })
                .error(function (data) {
                    return data;
                });
        }
    }

}]);

function processData(data) {
    console.log(data);
    var processedData = [];
    data.forEach(function(app){
        var index = 0;
        var l = new String();

        app.labels.forEach(function(label) {
            l += label.split('_').join(' ');
            if (index < app.labels.length-1) {
                l += ", "
            }
            index ++;
        });
        app.label = l;
        console.log(app.label);
        processedData.push(app);
    });
    return processedData;
}

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
