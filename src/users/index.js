const { decode } = require('jsonwebtoken');
const UsersController = require('./user.controller');
const UsersManager = require('./user.manager');

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
	const manager = new UsersManager(database);
	const controller = new UsersController(configs, manager);

	server.post('/api/user/login', asyncHandler(controller.Login.bind(controller)));
	server.get('/api/user', asyncHandler(controller.Get.bind(controller)));
};

const isLogedIn = (req, res, next) => {
	let decoded;
	let authorization = req.headers.authorization.split(' ')[1];
	try {
		decoded = jwt.verify(authorization, this.configs.token.secret);
		return decoded;
	} catch (e) {
		return res.send(401);
	}

	// if (!req.session.user) {
	// 	res.send(401);
	// 	next();
	// }
};

exports.init = init;
exports.isLogedIn = isLogedIn;
