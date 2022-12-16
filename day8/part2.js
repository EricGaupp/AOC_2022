const fs = require("fs");

function findViewDistance(treeHeight, view) {
  if (view.length === 0) return 1;
  const index = view.findIndex((val) => val >= treeHeight);
  return index === -1 ? view.length : index + 1;
}

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString();

  const treeRows = input.split(/\n/);
  const treeGrid = treeRows.map((row) =>
    row.split("").map((tree) => parseInt(tree.trim()))
  );

  const treeMap = new Map();

  for (let i = 0; i < treeGrid.length; i++) {
    for (let j = 0; j < treeGrid[i].length; j++) {
      const treeHeight = treeGrid[i][j];

      const leftTrees = treeGrid[i].slice(0, j).reverse();
      const rightTrees = treeGrid[i].slice(j + 1);
      const aboveTrees = treeGrid
        .map((row) => row[j])
        .slice(0, i)
        .reverse();
      const belowTrees = treeGrid.map((row) => row[j]).slice(i + 1);

      const leftView = findViewDistance(treeHeight, leftTrees);
      const rightView = findViewDistance(treeHeight, rightTrees);
      const aboveView = findViewDistance(treeHeight, aboveTrees);
      const belowView = findViewDistance(treeHeight, belowTrees);
      const viewScore = leftView * rightView * aboveView * belowView;

      treeMap.set(`x${i}y${j}`, viewScore);
    }
  }

  const answer = Math.max(...treeMap.values());
  console.log(answer);
});
