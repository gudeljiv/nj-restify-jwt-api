const user = require('./../users');

class OrganizationController {
	constructor(configs, manager) {
		this.configs = configs;
		this.manager = manager;
	}

	async getOrganization(req, res, next) {
		let results = [];
		console.log(req.session);

		user.isLogedIn(req, res, next);

		res.send(200, results);
	}

	async createOrganizations(req, res, next) {
		const body = req.body;

		let numResults = await this.manager.createOrganizations(body);
		res.status(201).send(`Created ${numResults} relationships.`);
	}
}

module.exports = OrganizationController;
