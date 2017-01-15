(function() {
	angular.module('sailsAngularMaterialStarter').factory('loginService', loginService);

	loginService.$inject = ['$q', '$http', 'api'];

	function loginService($q, $http, api) {

		var currentUser;

		return {
			login: login,
			logout: logout,
			getAuthenticatedUser: getAuthenticatedUser
		};

		function getAuthenticatedUser() {
			return currentUser;
		}

		function setAuthenticatedUser(user) {
			currentUser = user;
		}

		function login(user) {
			return $http.post(api.login, user)
				.then(function(response) {
					var authenticatedUser = response.data;
					setAuthenticatedUser(authenticatedUser);
					return authenticatedUser;
				})
				.catch(function () {
					return $q.reject();
				});
		}

		function logout() {
			return $http.post(api.logout);
		}
	}
})();
