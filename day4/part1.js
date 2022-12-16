const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const pairs = data.toString().split(/\n/);

  console.log(pairs.length);

  console.log(
    pairs
      .map((pair) =>
        pair
          .split(",")
          .map((lots) => lots.split("-").map((val) => parseInt(val)))
      )
      .reduce((acc, curr) => {
        if (curr[0][0] <= curr[1][0] && curr[0][1] >= curr[1][1]) {
          return acc + 1;
        } else if (curr[0][0] >= curr[1][0] && curr[0][1] <= curr[1][1]) {
          return acc + 1;
        }
        return acc;
      }, 0)
  );
});
