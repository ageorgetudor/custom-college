var _ = require('lodash');

var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

	paginated: function(req, res) {
		var page = req.param('page'),
			name = req.query.name,
			email = req.query.email,
			username = req.query.username,
			role = req.query.role,
			limit = 10,
			criteriaList = [],
			criteria;

		if (name) {
			criteriaList.push({ name: { like: '%' + name + '%' } });
		}

		if (email) {
			criteriaList.push({ email: { like: '%' + email + '%' } });
		}

		if (username) {
			criteriaList.push({ username: { like: '%' + username + '%' } });
		}

		if (name || email || username) {
			criteria = { $and: criteriaList };
		}

		sails.log(JSON.stringify(criteria));

		User.find(criteria)
			.paginate({ page: page, limit: limit })
			.populate('roles')
			.sort('name ASC')
			.then(function(users) {
				if (role) {
					users = users.filter(function(user) {
						var roleIds = user.roles.map(function(role) {
							return role.id
						});
						return roleIds.indexOf(role) != -1;
					});
				}
				res.json(users);
			});
	},

	details: function(req, res) {
		User.findOne(req.param('id'))
			.populate('roles')
			.then(function(users) {
				res.json(users);
			});
	}
});
