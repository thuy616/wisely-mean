angular.module('BearCtrl', []).controller('BearController', bearController);


function bearController($scope, bearService) {
	console.log("You reached Bear Controller");
	$scope.tagline = 'All bears are fluffy. Fredrik is a Bear. Therefore, Fredrik is Fluffy!';

	bearService.get().success(function(data) {
		console.log("successfully get bears");
		$scope.bears = data;
	});

}

bearController.$inject = ['$scope', 'bearService'];