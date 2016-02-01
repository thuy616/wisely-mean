/**
 * Created by thuy on 28/01/16.
 */
// public/js/controllers/GoogleAppsCtrl.js
angular.module('GoogleAppsCtrl', []).controller('GoogleAppsCtrl', function($scope, androidApps) {

    $scope.tagline = 'Top Apps in Google\'s Android Play Store!';
    androidApps.success(function(data) {
        $scope.apps = data;
    })
});

//GoogleAppsController.$inject = ['$scope']