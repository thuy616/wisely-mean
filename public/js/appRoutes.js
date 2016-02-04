
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log("appRoutes working...");
    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/bears', {
            templateUrl: 'views/bear.html',
            controller: 'BearController'
        })

        .when('/geeks', {
            templateUrl: 'views/geek.html',
            controller: 'GeekController'
        })

        .when('/android', {
            templateUrl: 'views/android.html',
            controller: 'GoogleAppsController'
        })

        .when('/ios', {
            templateUrl: 'views/ios.html',
            controller: 'AppleAppsController'
        });

    $locationProvider.html5Mode(true);

}]);