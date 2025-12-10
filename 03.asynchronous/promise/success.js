#!/usr/bin/env node

import { openDb, run, get, close } from "../sqlite-helpers.js";

let db;

openDb(":memory:")
  .then((tmpDb) => {
    db = tmpDb;

    return run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
  })
  .then(() => run(db, "INSERT INTO books (title) VALUES (?)", ["本A"]))
  .then((result) => {
    console.log(result.lastID);
  })
  .then(() => get(db, "SELECT id, title FROM books"))
  .then((row) => {
    console.log(row);
  })
  .then(() => run(db, "DROP TABLE books"))
  .then(() => close(db));
