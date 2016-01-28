/**
 * Created by thuy on 28/01/16.
 */
// public/js/controllers/AppleAppsCtrl.js
angular.module('AppleAppsCtrl', []).controller('AppleAppsController', function($scope, iosApps) {

    $scope.tagline = 'Top Apps in Apple\'s iOS App Store!';
    iosApps.success(function(data) {
       $scope.data = data;
    });

});


