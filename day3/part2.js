const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const rucksacks = data.toString().split(/\n/);

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const priorityMap = new Map();

  for (let i = 0; i < chars.length; i++) {
    priorityMap.set(chars[i], i + 1);
  }

  let sum = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    let j = 0;
    let notFound = true;
    while (notFound) {
      const char = rucksacks[i][j];
      if (rucksacks[i + 1].includes(char) && rucksacks[i + 2].includes(char)) {
        sum += priorityMap.get(char);
        notFound = false;
      }
      j++;
    }
  }

  console.log(sum);
});
