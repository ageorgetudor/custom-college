(function () {
	angular.module('botalytics').controller('LoginController', LoginController);

	LoginController.$inject = ['$window', 'loginService'];

	function LoginController($window, loginService) {
		var self = this;

		self.login = login;
		self.user = {};

		function login() {
			loginService.login(self.user)
				.then(function() {
					$window.location.href = '/';
				})
				.catch(function() {
					self.loginFailure = true;
				});
		}
	}
})();
