(function() {
	angular.module('sailsAngularMaterialStarter').controller('UserController', UserController);

	UserController.$inject = ['$mdDialog', 'userService', 'roleService', 'user'];


	function UserController($mdDialog, userService, roleService, user) {
		var vm = this;

		vm.save = save;
		vm.cancel = $mdDialog.cancel;
		vm.isCreate = user == undefined;
		vm.remove = remove;
		vm.user = user || {};

		getRoles().then(generateSelectedRoles);

		function getRoles() {
			return roleService.getRoles()
				.then(function(roles) {
					vm.roles = roles;
				});
		}

		function generateSelectedRoles() {

			if (vm.isCreate) return;

			for (var i = 0; i < vm.roles.length; i++) {
				var checkRole = vm.roles[i];
				var hasRole = vm.user.roles.filter(function(role) {
					return role.name == checkRole.name;
				});
				if (hasRole.length) {
					vm.roles[i].selected = true;
				}
			}
		}

		function selectedRoles() {
			var roles = [];
			for (var i = 0; i < vm.roles.length; i++) {
				var role = vm.roles[i];
				if (role.selected) {
					roles.push(role.id);
				}
			}
			return roles;
		}

		function save() {
			var saveUser = angular.copy(vm.user);
			saveUser.roles = selectedRoles();
			userService.save(saveUser).then($mdDialog.cancel);
		}

		function remove() {
			var confirm = $mdDialog.confirm()
				.title('Delete User?')
				.ok('Delete')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function() {
				userService.remove(vm.user).then(goBack);
			});
		}

	}

})();

