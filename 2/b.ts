import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");
const gameLines = input.split("\n").filter(Boolean);

const maxColorValues = gameLines.map((game) => {
  const plays = getGamePlays(game);
  const colors = plays.map((play) => ({
    red: getColorValue(play, "red"),
    green: getColorValue(play, "green"),
    blue: getColorValue(play, "blue"),
  }));
  const reds = Math.max(...colors.map((color) => color.red));
  const greens = Math.max(...colors.map((color) => color.green));
  const blues = Math.max(...colors.map((color) => color.blue));
  return reds * blues * greens;
});

function getGamePlays(game: string): string[] {
  return game.replace(/Game (\d+): /, "").split(";");
}

function getColorValue(play: string, color: string): number {
  return +(play.match(new RegExp(`(\\d+) ${color}`))?.[1] || 0);
}

console.log(maxColorValues.reduce((acc, sum) => acc + sum, 0));
