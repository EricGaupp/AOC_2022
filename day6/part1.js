const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString();

  let found = false;
  let i = 0;
  while (!found) {
    const set = new Set(input.slice(i, i + 4));
    if (set.size === 4) {
      console.log(set);
      found = true;
      console.log(i + 4);
    }
    i += 1;
  }
});
