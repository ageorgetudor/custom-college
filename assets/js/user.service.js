(function() {
	angular.module('sailsAngularMaterialStarter').factory('userService', userService);

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
			getUsersPaginated: getUsersPaginated
		};

		function returnData(response) {
			return response.data;
		}

		function getUsers() {
			return $http.get(api.users).then(returnData);
		}

		function getUser(id) {
			return $http.get(api.userDetails(id)).then(returnData);
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

		function getUsersPaginated(page, name, email, username, role) {
			var params = {};

			if (name) {
				params.name = name;
			}

			if (email) {
				params.email = email;
			}

			if (username) {
				params.username = username;
			}

			if (role) {
				params.role = role;
			}

			return $http.get(api.usersPaginated(page), { params: params }).then(returnData);
		}
	}
})();
