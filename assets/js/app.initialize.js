(function() {
	angular.module('sailsAngularMaterialStarter').run(runBlock);

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {

		Array.prototype.remove = function (object) {
			return this.splice(this.indexOf(object), 1);
		};

		$rootScope.$on('$routeChangeStart', function (event, next, current) {
			if (current && current.$$route) {
				$rootScope.previousPath = $rootScope.currentPath;
				$rootScope.currentPath = current.$$route.originalPath;
			}
		});
	}
})();

