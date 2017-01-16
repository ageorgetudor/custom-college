(function () {
	angular.module('sailsAngularMaterialStarter').constant('api', {
		login: '/auth/local',
		logout: '/auth/logout',
		users: '/user',
		usersPaginated: function(page) { return '/user/page/' + page },
		user: function (id) { return '/user/' + id },
		userDetails: function (id) { return '/user/' + id + '/details' },
		password: function (username) { return '/user/password/' + username },
		roles: '/role',
		myPermissions: '/my-permissions',
		me: '/user/me'

	});
})();
