const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString().split(/\n/);

  let X = 1;
  let cycle = 1;

  const cyclesToCheck = [20, 60, 100, 140, 180, 220];
  const signalStrengths = [];

  function checkCycle() {
    return cyclesToCheck.includes(cycle);
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "noop") {
      if (checkCycle()) {
        signalStrengths.push(X * cycle);
      }
      cycle += 1;
    } else {
      let addCycles = 1;
      while (addCycles < 3) {
        if (checkCycle()) {
          signalStrengths.push(X * cycle);
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

  console.log(signalStrengths.reduce((acc, curr) => acc + curr, 0));
});
