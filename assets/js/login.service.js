(function() {
	angular.module('sailsAngularMaterialStarter').factory('loginService', loginService);

	loginService.$inject = ['$q', '$http', 'api'];

	function loginService($q, $http, api) {

		var observerCallbacks = [];

		return {
			login: login,
			logout: logout,
			registerObserverCallback: registerObserverCallback
		};


		function login(user) {
			return $http.post(api.login, user)
				.then(function(response) {
					notifyObservers(true);
					return response.data;
				})
				.catch(function () {
					return $q.reject();
				});
		}

		function registerObserverCallback(callback) {
			observerCallbacks.push(callback);
		}

		function notifyObservers(isAuthenticated) {
			angular.forEach(observerCallbacks, function(callback) {
				callback(isAuthenticated);
			});
		}

		function logout() {
			return $http.post(api.logout)
				.then(function() {
					notifyObservers(false);
				});
		}
	}
})();
