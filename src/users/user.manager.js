class UsersManager {
	constructor(database) {
		this.database = database;
	}

	async Get(email) {
		const query = `SELECT firstname,lastname,email,phone,active from cms_users WHERE email = ?`;

		let conn = await this.database.getConnection();
		let [res] = await conn.execute(query, [email]);
		conn.release();
		return res;
	}

	async Login(params) {
		const { email, password } = params;
		const query = `SELECT firstname,lastname,email,phone,active from cms_users where email = ? and password = md5(?) and active = 1`;

		let conn = await this.database.getConnection();
		let [res] = await conn.execute(query, [email, password]);
		conn.release();
		return res;
	}
}

module.exports = UsersManager;
