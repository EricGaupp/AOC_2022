const fs = require("fs");

function getFolder(filesystem, pwd) {
  const pathArray = pwd.split("/").slice(1);
  return pathArray.reduce((acc, curr) => {
    return acc[curr];
  }, filesystem);
}

let numFolders = 0;
let totalSize = 0;
let folderSizes = [];
function getFolderSize(filesystem) {
  const folderSize = Object.values(filesystem).reduce((acc, curr) => {
    if (typeof curr === "number") {
      return acc + curr;
    } else {
      return acc + getFolderSize(curr);
    }
  }, 0);
  if (folderSize <= 100000) {
    numFolders++;
    totalSize += folderSize;
  }
  folderSizes.push(folderSize);
  return folderSize;
}

fs.readFile("./input.txt", (err, data) => {
  if (err) throw Error(err);

  const input = data.toString();

  const instructions = input.split(/\n/);

  const filesystem = {};

  let pwd = "";

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].startsWith("$ cd")) {
      const [, , path] = instructions[i].split(" ");

      if (path === "/") {
        pwd = "";
      } else if (path === "..") {
        const pathArray = pwd.split("/");
        pathArray.splice(-1);
        pwd = pathArray.join("/");
      } else {
        const pathArray = pwd.split("/");
        pathArray.push(path);
        pwd = pathArray.join("/");
      }
    }

    if (instructions[i].startsWith("dir")) {
      const [, dirname] = instructions[i].split(" ");
      const folder = getFolder(filesystem, pwd);
      folder[dirname] = {};
    }

    if (instructions[i].match(/\d+/)) {
      const [size, name] = instructions[i].split(" ");
      const folder = getFolder(filesystem, pwd);
      folder[name] = parseInt(size);
    }
  }

  const MINIMUM = 30000000;
  const freeSpace = 70000000 - getFolderSize(filesystem);
  const spaceToClear = MINIMUM - freeSpace;
  const answer = Math.min(
    ...folderSizes.filter((folderSize) => folderSize >= spaceToClear)
  );
  console.log(answer);
});
