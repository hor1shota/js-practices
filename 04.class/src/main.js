#!/usr/bin/env node

import minimist from "minimist";
import { Memo } from "./memo.js";
import { MemosController } from "./memos-controller.js";
import { openDb, run, close } from "./sqlite-helpers.js";

const db = await openDb("memo.db");
await run(
  db,
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

await close(db);
