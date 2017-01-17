(function() {
	angular.module('sailsAngularMaterialStarter').factory('loginService', loginService);

	loginService.$inject = ['$q', '$http', 'api'];

	function loginService($q, $http, api) {

		return {
			login: login,
			logout: logout
		};

		function login(user) {
			return $http.post(api.login, user)
				.then(function(response) {
					return response.data;
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
