(function() {
	angular.module('sailsAngularMaterialStarter').controller('ProfileController', ProfileController);

	ProfileController.$inject = ['$rootScope', '$mdDialog', 'userService'];

	function ProfileController($rootScope, $mdDialog, userService) {
		var vm = this;

		vm.isProfile = true;
		vm.cancel = $mdDialog.cancel;
		vm.save = save;

		userService.getMe().then(function(user) {
			vm.user = user;
		});

		function save() {
			var saveUser = angular.copy(vm.user);
			saveUser.roles = undefined;
			userService.save(saveUser).then(function() {
				$rootScope.currentUser = angular.copy(vm.user);
				$mdDialog.cancel();
			});
		}
	}
})();
