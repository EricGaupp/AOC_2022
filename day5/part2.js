const fs = require("fs");

const stackMap = new Map();

stackMap.set(1, ["F", "T", "C", "L", "R", "P", "G", "Q"]);
stackMap.set(2, ["N", "Q", "H", "W", "R", "F", "S", "J"]);
stackMap.set(3, ["F", "B", "H", "W", "P", "M", "Q"]);
stackMap.set(4, ["V", "S", "T", "D", "F"]);
stackMap.set(5, ["Q", "L", "D", "W", "V", "F", "Z"]);
stackMap.set(6, ["Z", "C", "L", "S"]);
stackMap.set(7, ["Z", "B", "M", "V", "D", "F"]);
stackMap.set(8, ["T", "J", "B"]);
stackMap.set(9, ["Q", "N", "B", "G", "L", "S", "P", "H"]);

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const instructions = data
    .toString()
    .split(/move /)
    .slice(1)
    .map((instruction) => instruction.trim());

  for (let i = 0; i < instructions.length; i++) {
    const [numCrates, from, to] = instructions[i]
      .replace("from ", "")
      .replace("to ", "")
      .split(" ")
      .map((value) => parseInt(value));

    const fromStack = stackMap.get(from);
    const toStack = stackMap.get(to);
    const movedCrates = fromStack.splice(numCrates * -1);
    toStack.push(...movedCrates);
  }

  console.log(stackMap);

  const answer = Array.from(stackMap.values())
    .map((stack) => stack.pop())
    .join("");

  console.log(answer);
});
