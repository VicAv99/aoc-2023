import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const words = input.split("\n").filter(Boolean);

const onlyNumbs = words.map((word) => {
  const numbs = word.replace(/[a-zA-Z]/g, "");
  return +(numbs.at(0)! + numbs.at(-1)!);
});

const total = onlyNumbs.reduce((acc, curr) => acc + curr, 0);

console.log(total);
