(function() {
	angular.module('sailsAngularMaterialStarter').controller('AppController', AppController);

	AppController.$inject = ['$window', '$mdSidenav', '$mdDialog', 'loginService'];

	function AppController($window, $mdSidenav, $mdDialog, loginService) {
		var self = this;

		self.toggleMenu = toggleMenu;
		self.changePassword = changePassword;
		self.logout = logout;
		self.menuItems = [
			{
				label: 'Menu Item',
				url: '#/'
			}
		];

		function toggleMenu() {
			$mdSidenav('menu').toggle();
		}

		function changePassword(event) {
			$mdDialog.show({
				controller: 'PasswordController',
				controllerAs: 'self',
				templateUrl: 'password.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose:true,
			});
		}

		function logout() {
			loginService.logout().then(function () {
				$window.location.href = '/login';
			});
		}
	}
})();