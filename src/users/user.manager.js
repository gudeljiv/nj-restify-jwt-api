class UsersManager {
	constructor(database) {
		this.database = database;
	}

	async Get(id_cms_users) {
		const query = `SELECT firstname,lastname,email,phone,active from cms_users WHERE id_cms_users = ?`;

		let conn = await this.database.getConnection();
		let [res] = await conn.execute(query, [id_cms_users]);
		conn.release();
		return res;
	}

	async Login(params) {
		const { email, password } = params;
		const query = `SELECT firstname,lastname,email,id_cms_users from cms_users where email = ? and password = md5(?) and active = 1`;

		let conn = await this.database.getConnection();
		let [res] = await conn.execute(query, [email, password]);
		conn.release();
		return res;
	}
}

module.exports = UsersManager;
