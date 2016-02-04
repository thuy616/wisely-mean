angular.module('iosService', []).factory('iosService', ['$http', function($http) {


    return {
        // call to get all ios apps
        get: function () {
            console.log("calling the backend api - get all ios apps!");
            return $http.get('/api/apps/ios')
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