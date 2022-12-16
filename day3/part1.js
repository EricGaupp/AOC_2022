const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const rucksacks = data.toString().split(/\n/);

  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const priorityMap = new Map();

  for (let i = 0; i < chars.length; i++) {
    priorityMap.set(chars[i], i + 1);
  }

  const sum = rucksacks.reduce((acc, curr) => {
    for (let i = 0; i < curr.length / 2; i++) {
      if (curr.slice(curr.length / 2).includes(curr[i])) {
        return acc + priorityMap.get(curr[i]);
      }
    }
  }, 0);

  console.log(sum);
});
