#!/usr/bin/env node

import minimist from "minimist";
import { Database } from "./database.js";
import { Memo } from "./memo.js";
import { MemosController } from "./memos-controller.js";

const db = await Database.open("memo.db");

await db.run(
  `
  CREATE TABLE IF NOT EXISTS memos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    body TEXT NOT NULL
  )
  `,
);

Memo.setDb(db);

const flags = minimist(process.argv.slice(2));
const controller = new MemosController();

if (flags.l) {
  await controller.index();
} else if (flags.r) {
  await controller.show();
} else if (flags.d) {
  await controller.destroy();
} else {
  await controller.create();
}

await db.close();
