/**
 * Created by thuy on 04/02/16.
 */

angular.module('iosRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("iosRoutes working...");
    $routeProvider

    // home page
        .when('/index_split.html', {
            templateUrl: 'views/ios.html',
            controller: 'AppleAppsController'
        })

        .when('/top_paid', {
            templateUrl: 'views/top_paid.html',
            controller: 'AppleAppsController'
        })

        .when('/top_free', {
            templateUrl: 'views/top_free.html',
            controller: 'AppleAppsController'
        });

    $locationProvider.html5Mode(true);

}]);