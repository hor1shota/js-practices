export class Memo {
  static db;

  static setDb(db) {
    this.db = db;
  }

  static async all() {
    const rows = await this.db.all("SELECT * FROM memos ORDER BY id");
    return rows.map((row) => new Memo(row));
  }

  static async find(id) {
    const row = await this.db.get("SELECT * FROM memos WHERE id = (?)", [id]);
    return new Memo(row);
  }

  constructor({ id = null, title, body }) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  async save() {
    const result = await this.constructor.db.run(
      "INSERT INTO memos (title, body) VALUES (?, ?)",
      [this.title, this.body],
    );
    this.id = result.lastID;
    return result;
  }

  async destroy() {
    const result = await this.constructor.db.run(
      "DELETE FROM memos WHERE id = (?)",
      [this.id],
    );
    return result;
  }
}
