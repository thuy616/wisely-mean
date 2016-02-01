angular.module('BearService', []).factory('bearService', ['$http', function($http) {

    return {
        // call to get all bears
        get : function() {
            console.log("calling the backend api - get all bears!");
            return $http.get('/api/bears')
                .success(function(data) {
                    console.log("results:");
                    console.log(data);
                return data;
                })
                .error(function(data){
                    return data;
            });
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(bearData) {
            return $http.post('/api/bears', bearData);
        },

        // call to DELETE a bear
        delete : function(id) {
            return $http.delete('/api/bears/' + id);
        }
    }

}]);