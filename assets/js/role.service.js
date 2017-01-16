(function() {
	angular.module('sailsAngularMaterialStarter').factory('roleService', roleService);

	roleService.$inject = ['$http', 'api'];

	function roleService($http, api) {
		return {
			getRoles: getRoles
		};

		function returnData(response) {
			return response.data;
		}

		function getRoles() {
			return $http.get(api.roles).then(returnData);
		}
	}

})();
