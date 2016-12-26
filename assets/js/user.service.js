(function() {
	angular.module('botalytics').factory('userService', userService);

	userService.$inject = ['$http', 'api'];

	function userService($http, api) {
		return {
			getUsers: getUsers,
			getUser: getUser,
			save: save,
			remove: remove,
			getMe: getMe,
			changePassword:changePassword,
			getMyPermissions: getMyPermissions,
		};

		function returnData(response) {
			return response.data;
		}

		function getUsers() {
			return $http.get(api.users).then(returnData);
		}

		function getUser(id) {
			return $http.get(api.user(id)).then(returnData);
		}

		function save(user) {
			return user.id ? update(user): create(user);
		}

		function update(user) {
			return $http.put(api.user(user.id), user);
		}

		function create(user) {
			return $http.post(api.users, user);
		}

		function remove(user){
			return $http.delete(api.user(user.id), user);
		}

		function changePassword(user,password) {
			return $http.post(api.password(user.username), { password: password });
		}

		function getMyPermissions() {
			return $http.get(api.myPermissions).then(returnData);
		}

		function getMe() {
			return $http.get(api.me).then(returnData);
		}
	}
})();
