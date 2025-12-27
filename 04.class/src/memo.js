import { run, get, all } from "./sqlite-helpers.js";

export class Memo {
  static db;

  static setDb(db) {
    this.db = db;
  }

  static async all() {
    const rows = await all(this.db, "SELECT * FROM memos");
    return rows.map((row) => new Memo(row));
  }

  static async find(id) {
    const row = await get(this.db, "SELECT * FROM memos WHERE id = (?)", [id]);
    return new Memo(row);
  }

  constructor({ id = null, title, body }) {
    this.id = id;
    this.title = title;
    this.body = body;
  }

  async save() {
    const result = await run(
      this.constructor.db,
      "INSERT INTO memos (title, body) VALUES (?, ?)",
      [this.title, this.body],
    );
    this.id = result.lastID;
    return result;
  }

  async destroy() {
    const result = await run(
      this.constructor.db,
      "DELETE FROM memos WHERE id = (?)",
      [this.id],
    );
    return result;
  }
}
