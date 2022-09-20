const { readdirSync, readFileSync, lstatSync } = require("fs");
const fs = require("fs");
const path = require("path");

const getDir = (source) => {
  const results = readdirSync(source);
  results.forEach(function (result) {
    if (lstatSync(path.join(source, result)).isFile()) {
      if (
        readFileSync(path.join(source, result)).includes(argument) &&
        path.extname(result).toLowerCase() === extension
      ) {
        // console.log("\n" + argument + " is found in:");
        dirSource = source.split("/");
        let file = fs.readFileSync(source + "/" + result, "utf8");
        let arr = file.split(/\r?\n/);
        console.log(
          "\n\t" + dirSource[dirSource.length - 1] + "/" + result + '\n');
        arr.forEach((line, idx) => {
          if (line.includes(argument)) {
            console.log('\t\t' + (idx+1) + ":" + line);
          }
        });
      }
    } else if (lstatSync(path.join(source, result)).isDirectory()) {
      getDir(path.join(source, result));
    }
  });
};

const dir = process.cwd();
const extension = ".xml"; //You can change the extension type here
let argument = process.argv[2];
getDir(dir);
