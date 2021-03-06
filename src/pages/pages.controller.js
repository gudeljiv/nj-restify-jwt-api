class PagesController {
	constructor(configs, manager) {
		this.configs = configs;
		this.manager = manager;
	}

	async GetAll(req, res, next) {
		let results = await this.manager.GetAll();
		res.send(200, results);
	}

	async Get(req, res, next) {
		req.params.id = req.params && req.params.id ? req.params.id : null;
		let [results] = await this.manager.GetAll(req.params.id);
		res.send(200, results);
	}
}

module.exports = PagesController;
