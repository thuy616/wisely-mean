
angular.module('appsWar', ['ngRoute', 'appRoutes', 'MainCtrl', 'BearCtrl', 'BearService', 'GeekCtrl', 'GeekService', 'AppleAppsCtrl', 'iosService', 'GoogleAppsCtrl', 'androidService', 'angular-input-stars']);

angular.module('iosApp', ['ngRoute', 'iosRoutes', 'AppleAppsCtrl', 'iosService', 'angular-input-stars']);

angular.module('androidApp', ['ngRoute', 'androidRoutes', 'GoogleAppsCtrl', 'androidService', 'angular-input-stars']);