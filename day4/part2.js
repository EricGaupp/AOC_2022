const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const pairs = data.toString().split(/\n/);

  const overlappingPairs = pairs
    .map((pair) =>
      pair.split(",").map((lots) => lots.split("-").map((val) => parseInt(val)))
    )
    .reduce((acc, curr) => {
      const firstLot = new Set();
      for (let i = curr[0][0]; i <= curr[0][1]; i++) {
        firstLot.add(i);
      }
      for (let j = curr[1][0]; j <= curr[1][1]; j++) {
        if (firstLot.has(j)) {
          return acc + 1;
        }
      }
      return acc;
    }, 0);

  console.log(overlappingPairs);
});
