angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/ios', {
			templateUrl: 'views/ios.html',
			controller: 'AppleAppsController'
		})

		.when('/android', {
			templateUrl: 'views/android.html',
			controller: 'GoogleAppsController'
		});

	$locationProvider.html5Mode(true);

}]);