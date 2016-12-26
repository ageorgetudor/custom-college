/**
 * IndexController
 *
 * @description :: Server-side logic for managing Indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require('async');
var _ = require('lodash');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {

	index: function(req, res) {
		return res.view('index');
	},

	myPermissions: function(req, res) {
		if (req.session.passport) {
			async.waterfall([findUser, findPermissions, buildResponse], done);

			function done(error, permissions){
				res.json(permissions);
			}

			function findUser(done){
				User.findOne(req.session.passport.user)
					.populate('roles')
					.then(function(user) {
						done(null, user);
					});
			}

			function findPermissions(user, done) {
				var ids = user.roles.map(function(role) {
					return role.id;
				});

				Role.find({id: ids})
					.populate('permissions')
					.then(function (roles) {
						var permissions = [];
						_.forEach(roles,function(role){
							permissions = permissions.concat(role.permissions);
						});
						done(null, permissions);
					});
			}

			function buildResponse(permissions, done){

				var ids = permissions.map(function(permission) {
					return permission.id;
				});

				Permission.find({id: ids})
					.populate('model')
					.then(function (permissions) {
						var response = {};
						_.forEach(permissions, function (permission) {
							response['can' + capitalizeFirstLetter(permission.action) + permission.model.name] = true;
						});
						done(null, response);
					})
			}
		}
		else {
			res.forbidden();
		}
	}
};

