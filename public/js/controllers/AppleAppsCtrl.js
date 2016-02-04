/**
 * Created by thuy on 28/01/16.
 */
// public/js/controllers/AppleAppsCtrl.js
angular.module('AppleAppsCtrl', []).controller('AppleAppsController', iosController);

function iosController($scope, iosService) {

    $scope.tagline = 'Top Apps in Apple\'s ios App Store!';
    iosService.get().success(function(data) {
        $scope.apps = data;
    });
}

iosController.$inject = ['$scope', 'iosService'];
