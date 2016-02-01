/**
 * Created by thuy on 28/01/16.
 */
// public/js/controllers/AppleAppsCtrl.js
angular.module('AppleAppsCtrl', []).controller('AppleAppsCtrl', function($scope, iosApps) {

    $scope.tagline = 'Top Apps in Apple\'s iOS App Store!';
    iosApps.success(function(data) {
        $scope.apps = data;
    })

});

//app.controller('AppleAppsController', ['$scope', 'iosApps', function($scope, iosApps) {
//    $scope.tagline = 'Top Apps in Apple\'s iOS App Store!';
//    iosApps.success(function(data) {
//        $scope.apps = data;
//    })
//}]);


//AppleAppsController.$inject = ['$scope']