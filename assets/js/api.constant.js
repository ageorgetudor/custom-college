(function () {
	angular.module('botalytics').constant('api', {
		login: '/auth/local',
		logout: '/auth/logout',
		users: '/user',
		user: function (id) { return '/user/' + id },
		password: function (username) { return '/user/password/' + username },
		roles: '/role',
		myPermissions: '/my-permissions',
		me: '/user/me'
	});
})();
