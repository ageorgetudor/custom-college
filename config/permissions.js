// config/permissions.js

var _ = require('lodash');
var _super = require('sails-permissions/config/permissions');

_.merge(exports, _super);
_.merge(exports, {
	adminUsername: 'admin',
	adminEmail: 'admin@example.com',
	adminPassword: 'admin1234'
});
