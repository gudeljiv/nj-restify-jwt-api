const jwt = require('jsonwebtoken');

class UsersController {
	constructor(configs, manager) {
		this.configs = configs;
		this.manager = manager;
	}

	async Get(req, res, next) {
		if (req.headers && req.headers.authorization) {
			let decoded;
			let authorization = req.headers.authorization.split(' ')[1];
			try {
				decoded = jwt.verify(authorization, this.configs.token.secret);
			} catch (e) {
				return res.send(401);
			}

			let [result] = await this.manager.Get(decoded.user.id_cms_users);
			return res.send(200, result);
		}
		return res.send(401);
	}

	async Login(req, res, next) {
		const body = req.body;
		let [result] = await this.manager.Login(body);

		if (result) {
			let token = jwt.sign({ user: result }, this.configs.token.secret, {
				expiresIn: this.configs.token.expiresIn,
			});

			let { iat, exp } = jwt.decode(token);

			res.send(200, { user: result, iat, exp, token });
		} else {
			res.send(401);
		}
	}
}

module.exports = UsersController;
