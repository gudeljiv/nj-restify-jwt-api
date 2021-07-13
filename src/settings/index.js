const SettingsController = require('./settings.controller');
const SettingsManager = require('./settings.manager');
const UsersController = require('../users/user.controller');
const UsersManager = require('../users/user.manager');

function asyncHandler(routeHandler) {
	return async function (req, res, next) {
		try {
			await routeHandler(req, res, next);
		} catch (err) {
			next(err);
		}
	};
}

const init = (server, configs, database) => {
	const manager = new SettingsManager(database);
	const controller = new SettingsController(configs, manager);

	const user_manager = new UsersManager(database);
	const user_controller = new UsersController(configs, user_manager);

	server.get('/api/settings2', asyncHandler(user_controller.Get.bind(user_controller)));
	server.get('/api/settings', asyncHandler(controller.Get.bind(controller)));
};

exports.init = init;
