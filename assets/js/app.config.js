(function() {
	angular.module('sailsAngularMaterialStarter').config(configure);

	configure.$inject = ['$httpProvider', '$routeProvider'];

	function configure($httpProvider, $routeProvider) {

		$routeProvider
			.when('/', { templateUrl: 'home.html' })
			.when('/users', { templateUrl: 'users.html' })
			.when('/user/:id?', {
				templateUrl: 'user.html',
				controller: 'UserController',
				controllerAs: 'vm'
			})
			.when('/profile', {
				templateUrl: 'user.html',
				controller: 'ProfileController',
				controllerAs: 'vm'
			})
			.otherwise({ templateUrl: 'home.html' });

		$httpProvider.defaults.withCredentials = true;
	}
})();