/**
 * Created by thuy on 28/01/16.
 */
// public/js/controllers/GoogleAppsCtrl.js
angular.module('GoogleAppsCtrl', []).controller('GoogleAppsController', androidController);

function androidController($scope, androidService) {

    $scope.tagline = 'Top Apps in Google\'s Android Play Store!';
    androidService.get().success(function(data) {
        $scope.apps = data;
    });
}

androidController.$inject = ['$scope', 'androidService'];
