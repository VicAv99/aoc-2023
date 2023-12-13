import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");
const words = input.split("\n").filter(Boolean);

const numMap: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const onlyNumbs = words.map((word) => {
  const numbs = word
    .replace(
      /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g,
      (_, word) => numMap[word] || word
    )
    .replace(/[a-zA-Z]/g, "");
  return +(numbs.at(0)! + numbs.at(-1)!);
});

const total = onlyNumbs.reduce((acc, curr) => acc + curr, 0);

console.log(total);
