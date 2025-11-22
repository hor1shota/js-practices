#!/usr/bin/env node

import { openDB, run, all } from "../common.js";

(async function () {
  const db = await openDB();

  await run(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  const titles = ["本A", "本B", "本C", "本D", "本A"];
  for (const title of titles) {
    await run(db, "INSERT INTO books (title) VALUES (?)", [title]);
  }

  await all(db, "SELECT id, title, content FROM books");

  await run(db, "DROP TABLE books");

  db.close();
})();
