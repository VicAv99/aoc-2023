import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");
const gameLines = input.split("\n").filter(Boolean);

type Game = {
  id: number;
  plays: Play[];
};

type Play = {
  red: boolean;
  green: boolean;
  blue: boolean;
};

const RED_LIMIT = 12;
const GREEN_LIMIT = 13;
const BLUE_LIMIT = 14;

const games: Game[] = gameLines.map((game) => {
  return {
    id: getGameId(game),
    plays: getGamePlays(game).map((play) => ({
      red: getColorValue(play, "red") <= RED_LIMIT,
      green: getColorValue(play, "green") <= GREEN_LIMIT,
      blue: getColorValue(play, "blue") <= BLUE_LIMIT,
    })),
  };
});

const possibleGames = games.filter((game) =>
  game.plays.some((play) => play.red && play.green && play.blue)
);

function getColorValue(play: string, color: string): number {
  return +(play.match(new RegExp(`(\\d+) ${color}`))?.[1] || 0);
}

function getGameId(game: string): number {
  return +game.match(/Game (\d+)/)![1];
}

function getGamePlays(game: string): string[] {
  return game.replace(/Game (\d+): /, "").split(";");
}

console.log(possibleGames.reduce((acc, game) => acc + +game.id, 0));
