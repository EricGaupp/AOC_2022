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
        if (opponentMove === "A") {
          total += 3;
        } else if (opponentMove === "B") {
          total += 1;
        } else if (opponentMove === "C") {
          total += 2;
        }
        break;
      }
      case "Y": {
        total += 3;
        if (opponentMove === "A") {
          total += 1;
        } else if (opponentMove === "B") {
          total += 2;
        } else if (opponentMove === "C") {
          total += 3;
        }
        break;
      }
      case "Z": {
        total += 6;
        if (opponentMove === "A") {
          total += 2;
        } else if (opponentMove === "B") {
          total += 3;
        } else if (opponentMove === "C") {
          total += 1;
        }
        break;
      }
      default: {
        throw Error("inconceivable");
      }
    }
  });

  console.log(total);
});
