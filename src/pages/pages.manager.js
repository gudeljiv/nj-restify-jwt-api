class PagesManager {
	constructor(database) {
		this.database = database;
	}

	async GetAll(id = 0) {
		const query = `SELECT 
						p1.id_pages, 
						p1.id_rod, 
						p1.name, 
						p1.rbr, 
						p1.lang, 
						p1.link, 
						p1.published, 
						p1.id_pages_types,
						CASE WHEN length(p1.name) >= 60 THEN CONCAT(LEFT(p1.name, 57),'...') ELSE p1.name END name_concat_60,
						(SELECT COUNT(*) FROM pages p2 WHERE p2.id_rod = p1.id_pages) AS haschilds
					FROM pages p1
					WHERE p1.lang = ? AND p1.id_rod = ?
					ORDER BY p1.rbr`;

		let conn = await this.database.getConnection();
		let [res] = await conn.execute(query, ['hr', id]);

		for (let element of res) {
			if (element.haschilds > 0) {
				element.children = await this.GetAll(element.id_pages);
			}
		}

		conn.release();
		return res;
	}
}

module.exports = PagesManager;
