#!/usr/bin/env node

import { openDb, run, get, close } from "../sqlite-helpers.js";

const db = await openDb(":memory:");

await run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

try {
  const result = await run(db, "INSERT INTO books (title) VALUES (?)", [null]);

  console.log(result.lastID);
} catch (err) {
  if (err?.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}

try {
  const row = await get(db, "SELECT id, title, content FROM books");

  console.log(row);
} catch (err) {
  if (err?.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}

await run(db, "DROP TABLE books");

await close(db);
