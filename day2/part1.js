const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    throw Error(err);
  }

  const strategy = data.toString().split(/\n/);

  let total = 0;

  strategy.forEach((round) => {
    const [opponentMove, matchOutcome] = round.split(" ");

    switch (matchOutcome) {
      case "X": {
        total += 1;
        if (opponentMove === "A") {
          total += 3;
        } else if (opponentMove === "C") {
          total += 6;
        }
        break;
      }
      case "Y": {
        total += 2;
        if (opponentMove === "A") {
          total += 6;
        } else if (opponentMove === "B") {
          total += 3;
        }
        break;
      }
      case "Z": {
        total += 3;
        if (opponentMove === "B") {
          total += 6;
        } else if (opponentMove === "C") {
          total += 3;
        }
      }
    }
  });

  console.log(total);
});
