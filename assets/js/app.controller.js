(function() {
	angular.module('sailsAngularMaterialStarter').controller('AppController', AppController);

	AppController.$inject = ['$window', '$rootScope', '$mdSidenav', '$mdDialog', 'userService', 'loginService'];

	function AppController($window, $rootScope, $mdSidenav, $mdDialog, userService, loginService) {
		var vm = this;

		vm.toggleSideMenu = toggleSideMenu;
		vm.toggleUserMenu = toggleUserMenu;
		vm.changePassword = changePassword;
		vm.editProfile = editProfile;
		vm.logout = logout;

		vm.menuItems = [
			{
				label: 'Manage Users',
				url: '#/users'
			}
		];

		getUserInfo();
		loginService.registerObserverCallback(function(isAuthenticated) {
			if (isAuthenticated) {
				getUserInfo();
			}
			else {
				$rootScope.currentUser = undefined;
				vm.permissions = undefined;
			}
		});

		function getUserInfo() {
			userService.getMe().then(function (user) {
				$rootScope.currentUser = user;
			});
			userService.getMyPermissions()
				.then(function (permissions) {
					vm.permissions = permissions;
					vm.isAuthenticated = true;
				})
				.catch(function () {
					vm.permissions = undefined;
					vm.isAuthenticated = false;

				});
		}

		function toggleSideMenu() {
			$mdSidenav('menu').toggle();
		}

		function toggleUserMenu($mdOpenMenu, event) {
			$mdOpenMenu(event);
		}

		function editProfile(event) {
			$mdDialog.show({
				controller: 'ProfileController',
				controllerAs: 'vm',
				templateUrl: 'user.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true
			});
		}

		function changePassword(event) {
			$mdDialog.show({
				controller: 'PasswordController',
				controllerAs: 'vm',
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