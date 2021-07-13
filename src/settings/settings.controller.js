const jwt = require('jsonwebtoken');

class SettingsController {
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

			let [result] = await this.manager.Get(decoded.user.email);
			return res.send(200, result);
		}
		return res.send(401);
	}
}

module.exports = SettingsController;
