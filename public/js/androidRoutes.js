/**
 * Created by thuy on 04/02/16.
 */

angular.module('androidRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("androidRoutes working...");
    $routeProvider

    // home page
        .when('/index_split.html', {
            templateUrl: 'views/android.html',
            controller: 'GoogleAppsController'
        })

        .when('/top_paid', {
            templateUrl: 'views/top_paid.html',
            controller: 'GoogleAppsController'
        })

        .when('/top_free', {
            templateUrl: 'views/top_free.html',
            controller: 'GoogleAppsController'
        });

    $locationProvider.html5Mode(true);

}]);