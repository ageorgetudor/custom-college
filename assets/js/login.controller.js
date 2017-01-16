(function () {
	angular.module('sailsAngularMaterialStarter').controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'loginService'];

	function LoginController($window, loginService) {
		var vm = this;

		vm.login = login;
		vm.user = {};

		function login() {
			loginService.login(vm.user)
				.then(function() {
					$window.location.href = '/';
				})
				.catch(function() {
					vm.loginFailure = true;
				});
		}
	}
})();
