const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) {
    throw new Error(err);
  }

  const elves = data.toString().split(/\n{2}/);

  const maxCalories = Math.max(
    ...elves.map((elf) =>
      elf.split(/\n/).reduce((acc, curr) => acc + parseInt(curr), 0)
    )
  );

  console.log(maxCalories);
});
