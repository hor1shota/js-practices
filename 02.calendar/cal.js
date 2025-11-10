#!/usr/bin/env node

import minimist from "minimist";

const options = minimist(process.argv.slice(2));
const year = options.y;
const month = options.m === undefined ? undefined : options.m - 1;
const calendar = generateCalendar({ year, month });
console.log(calendar.join("\n"));

function generateCalendar({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}) {
  return [
    `      ${month + 1}月 ${year}`,
    "日 月 火 水 木 金 土",
    ...body(year, month),
  ];
}

function body(year, month) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  const blanks = Array.from({ length: firstDate.getDay() }, () => null);
  const fullDays = [
    ...blanks,
    ...Array.from({ length: lastDate.getDate() }, (_, i) => i + 1),
  ];
  const format = function (n) {
    return String(n ?? "").padStart(2, " ");
  };
  const eachSlice = function (array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  return eachSlice(fullDays, 7).map(function (days) {
    return days.map(format).join(" ");
  });
}
