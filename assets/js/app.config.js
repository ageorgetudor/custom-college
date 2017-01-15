(function() {
	angular.module('sailsAngularMaterialStarter').config(configure);

	configure.$inject = ['$httpProvider', '$routeProvider'];

	function configure($httpProvider, $routeProvider) {

		$routeProvider
			.when('/', { templateUrl: 'home.html' })
			.otherwise({ templateUrl: 'home.html' });

		$httpProvider.defaults.withCredentials = true;
	}
})();