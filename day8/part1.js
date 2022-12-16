const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString();

  const treeRows = input.split(/\n/);
  const treeGrid = treeRows.map((row) =>
    row.split("").map((tree) => parseInt(tree.trim()))
  );

  const treeSet = new Set();

  for (let i = 0; i < treeGrid.length; i++) {
    for (let j = 0; j < treeGrid[i].length; j++) {
      const leftTrees = treeGrid[i].slice(0, j);
      const rightTrees = treeGrid[i].slice(j + 1);
      const aboveTrees = treeGrid.map((row) => row[j]).slice(0, i);
      const belowTrees = treeGrid.map((row) => row[j]).slice(i + 1);
      //   console.log(`x${i}y${j}: ${treeGrid[i][j]}`);
      //   console.log(`left: ${leftTrees}`);
      //   console.log(`right: ${rightTrees}`);
      //   console.log(`above: ${aboveTrees}`);
      //   console.log(`below: ${belowTrees}`);
      if (
        leftTrees.length === 0 ||
        rightTrees.length === 0 ||
        aboveTrees.length === 0 ||
        belowTrees.length === 0 ||
        leftTrees.every((tree) => tree < treeGrid[i][j]) ||
        rightTrees.every((tree) => tree < treeGrid[i][j]) ||
        aboveTrees.every((tree) => tree < treeGrid[i][j]) ||
        belowTrees.every((tree) => tree < treeGrid[i][j])
      ) {
        treeSet.add(`x${i}y${j}`);
      }
    }
  }

  console.log(treeSet.size);
});
