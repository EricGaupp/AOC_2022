const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    throw new Error(err);
  }

  const elves = data.toString().split(/\n{2}/);

  const topThreeSum = elves
    .map((elf) =>
      elf.split(/\n/).reduce((acc, curr) => acc + parseInt(curr), 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(topThreeSum);
});
