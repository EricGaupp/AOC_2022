const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString().split(/\n/);

  console.log(input);

  let headX = 0;
  let headY = 0;
  let tailX = 0;
  let tailY = 0;

  const tailPositions = new Set();

  for (let i = 0; i < input.length; i++) {
    let [direction, steps] = input[i].split(" ");
    steps = parseInt(steps);

    for (let j = 0; j < steps; j++) {
      switch (direction) {
        case "R": {
          headX++;
          if (headX - tailX > 1) {
            tailX++;
            tailY = headY;
          }
          break;
        }
        case "L": {
          headX--;
          if (tailX - headX > 1) {
            tailX--;
            tailY = headY;
          }
          break;
        }
        case "U": {
          headY++;
          if (headY - tailY > 1) {
            tailY++;
            tailX = headX;
          }
          break;
        }
        case "D": {
          headY--;
          if (tailY - headY > 1) {
            tailY--;
            tailX = headX;
          }
          break;
        }
      }
      tailPositions.add(`x${tailX}y${tailY}`);
    }
  }

  console.log(tailPositions.size);
});
