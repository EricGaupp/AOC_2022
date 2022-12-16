const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString().split(/\n/);

  let X = 1;
  let cycle = 1;

  const cycleMap = new Map();

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "noop") {
      if (cycle % 40 >= X && cycle % 40 <= X + 2) {
        cycleMap.set(cycle, "#");
      } else {
        cycleMap.set(cycle, ".");
      }
      cycle += 1;
    } else {
      let addCycles = 1;
      while (addCycles < 3) {
        if (cycle % 40 >= X && cycle % 40 <= X + 2) {
          cycleMap.set(cycle, "#");
        } else {
          cycleMap.set(cycle, ".");
        }
        if (addCycles === 2) {
          let [, addX] = input[i].split(" ");
          X += parseInt(addX);
        }
        cycle++;
        addCycles++;
      }
    }
  }

  const answer = Array.from(cycleMap.values())
    .join("")
    .match(/.{40}/g)
    .join("\n");
  console.log(answer);
});
