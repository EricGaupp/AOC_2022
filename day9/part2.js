const fs = require("fs");

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString().split(/\n/);

  const positions = new Map();

  for (let i = 0; i < 10; i++) {
    positions.set(`length${i}`, { x: 0, y: 0 });
  }

  const tailPositions = new Set();

  for (let i = 0; i < input.length; i++) {
    let [direction, steps] = input[i].split(" ");

    for (let j = 0; j < parseInt(steps); j++) {
      switch (direction) {
        case "R": {
          const { x: headX, y: headY } = positions.get(`length0`);
          positions.set(`length0`, { x: headX + 1, y: headY });
          break;
        }
        case "L": {
          const { x: headX, y: headY } = positions.get(`length0`);
          positions.set(`length0`, { x: headX - 1, y: headY });
          break;
        }
        case "U": {
          const { x: headX, y: headY } = positions.get(`length0`);
          positions.set(`length0`, { x: headX, y: headY + 1 });
          break;
        }
        case "D": {
          const { x: headX, y: headY } = positions.get(`length0`);
          positions.set(`length0`, { x: headX, y: headY - 1 });
          break;
        }
      }
      for (let k = 1; k < 10; k++) {
        const { x: headX, y: headY } = positions.get(`length${k - 1}`);
        const { x: tailX, y: tailY } = positions.get(`length${k}`);
        if (headX - tailX > 0 && headX - tailX === headY - tailY) {
          //Upper right diagonal pull
          positions.set(`length${k}`, { x: headX - 1, y: headY - 1 });
        } else if (headX - tailX < 0 && tailX - headX === tailY - headY) {
          //Lower left diagonal pull
          positions.set(`length${k}`, { x: headX + 1, y: headY + 1 });
        } else if (
          headX - tailX < 0 &&
          Math.abs(headX - tailX) === Math.abs(headY - tailY)
        ) {
          //Upper left diagonal pll
          positions.set(`length${k}`, { x: headX + 1, y: headY - 1 });
        } else if (
          headX - tailX > 0 &&
          Math.abs(headX - tailX) === Math.abs(headY - tailY)
        ) {
          //Lower right diagonal pull
          positions.set(`length${k}`, { x: headX - 1, y: headY + 1 });
        } else if (headX - tailX > 1) {
          positions.set(`length${k}`, { x: headX - 1, y: headY });
        } else if (tailX - headX > 1) {
          positions.set(`length${k}`, { x: headX + 1, y: headY });
        } else if (headY - tailY > 1) {
          positions.set(`length${k}`, { x: headX, y: headY - 1 });
        } else if (tailY - headY > 1) {
          positions.set(`length${k}`, { x: headX, y: headY + 1 });
        }
        if (k === 9) {
          const { x, y } = positions.get(`length${k}`);
          tailPositions.add(`x${x}y${y}`);
        }
      }
    }
  }
  console.log(tailPositions);
  console.log(tailPositions.size);
});
