(function() {
	angular.module('sailsAngularMaterialStarter').controller('PasswordController', PasswordController);

	PasswordController.$inject = ['$mdDialog', '$mdToast', 'userService'];

	function PasswordController($mdDialog, $mdToast, userService) {
		var vm = this;
		vm.cancel = cancel;
		vm.submit = submit;
		vm.isValid = isValid;

		userService.getMe().then(function(user) {
			vm.user = user;
		});

		function cancel() {
			$mdDialog.cancel();
		}

		function submit() {
			userService.changePassword(vm.user, vm.newPassword).then(function() {
				$mdToast.show(
					$mdToast.simple()
						.textContent('Password Changed!')
						.position('top right')
						.hideDelay(3000)
				);
				$mdDialog.cancel();
			});
		}

		function isValid() {
			return vm.newPassword && vm.newPassword.length > 7 && vm.newPassword == vm.confirmPassword;
		}
	}
})();
