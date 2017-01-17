(function() {
	angular.module('sailsAngularMaterialStarter').controller('UsersController', UsersController);

	UsersController.$inject = ['$mdDialog', 'userService', 'roleService'];

	function UsersController($mdDialog, userService, roleService) {
		var vm = this;
		vm.rolesForUser = rolesForUser;

		vm.page = 1;
		vm.edit = edit;
		vm.remove = remove;
		vm.nextPage = nextPage;
		vm.previousPage = previousPage;
		vm.filterChanged = filterChanged;

		getUsers();
		roleService.getRoles().then(function(roles) {
			vm.roles = roles;
		});

		function rolesForUser(user) {
			return user.roles.map(function (role) {
				return role.name;
			}).join(', ')
		}

		function filterChanged() {

			if (!vm.nameFilter) {
				delete vm.nameFilter;
			}

			if (!vm.emailFilter) {
				delete vm.emailFilter;
			}

			if (!vm.usernameFilter) {
				delete vm.usernameFilter;
			}

			if (!vm.roleFilter) {
				delete vm.roleFilter;
			}
			vm.page = 1;
			getUsers();
		}

		function nextPage() {
			vm.page++;
			getUsers();
		}

		function previousPage() {
			vm.page--;
			getUsers();
		}

		function getUsers() {
			userService.getUsersPaginated(vm.page, vm.nameFilter, vm.emailFilter, vm.usernameFilter, vm.roleFilter)
				.then(function gotUsers(users) {
					vm.users = users;
				});
		}

		function edit(event, user) {
			$mdDialog.show({
				locals: { user: user },
				controller: 'UserController',
				controllerAs: 'vm',
				templateUrl: 'user.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				onRemoving: getUsers
			});
		}


		function remove(user) {
			var confirm = $mdDialog.confirm()
				.title('Delete User?')
				.ok('Delete')
				.cancel('Cancel');

			$mdDialog.show(confirm).then(function() {
				userService.remove(user).then(getUsers);
			});
		}

	}
})();

