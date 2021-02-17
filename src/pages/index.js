const PagesController = require('./pages.controller');
const PagesManager = require('./pages.manager');

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
	const manager = new PagesManager(database);
	const controller = new PagesController(configs, manager);

	server.get('/api/pages', asyncHandler(controller.GetAll.bind(controller)));
	server.get('/api/page/:id', asyncHandler(controller.Get.bind(controller)));
};

exports.init = init;
