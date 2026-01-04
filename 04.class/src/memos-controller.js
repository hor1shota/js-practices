import readline from "readline";
import { select } from "@inquirer/prompts";
import { Memo } from "./memo.js";

export class MemosController {
  async create() {
    const lines = await this.#readLinesFromStdin();
    const [title, ...bodyLines] = lines;
    const memo = new Memo({ title: title, body: bodyLines.join("\n") });
    await memo.save();
  }

  async index() {
    const memos = await Memo.all();
    const titles = memos.map((memo) => memo.title);
    console.log(titles.join("\n"));
  }

  async show() {
    const memo = await this.#chooseMemo("Choose a note you want to see:");
    console.log(`${memo.title}\n${memo.body}`);
  }

  async destroy() {
    const memo = await this.#chooseMemo("Choose a memo you want to delete:");
    await memo.destroy();
  }

  #readLinesFromStdin() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({ input: process.stdin });
      const lines = [];
      rl.on("line", (line) => {
        lines.push(line);
      });
      rl.on("close", () => {
        resolve(lines);
      });
    });
  }

  #chooseMemoId(memos, message) {
    const choices = memos.map((memo) => ({ name: memo.title, value: memo.id }));
    return select({ message: message, choices: choices });
  }

  async #chooseMemo(message) {
    const memos = await Memo.all();
    const id = await this.#chooseMemoId(memos, message);
    return Memo.find(id);
  }
}
