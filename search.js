const { readdirSync, readFileSync, lstatSync } = require("fs");
const fs = require("fs");
const path = require("path");
let newArr;
let res;
let parentRes;

const getDir = (source) => {
  const results = readdirSync(source);
  results.forEach(function (result) {
    if (lstatSync(path.join(source, result)).isFile()) {
      if (
        readFileSync(path.join(source, result)).includes(argument) &&
        path.extname(result).toLowerCase() === extension
      ) {
        dirSource = source.split("/");
        let file = fs.readFileSync(source + "/" + result, "utf8");
        let arr = file.split(/\r?\n/);
        console.log(
          "\n\t File: " + dirSource[dirSource.length - 1] + "/" + result + "\n"
        );
        arr.forEach((line, idx) => {
          if (line.includes(argument)) {
            newArr = arr.slice(0, idx + 1).reverse();
            res = newArr.find((el) => {
              return el.includes("<name>");
            });
            parentRes = res.replace("<name>", "").replace("</name>", "").trim();
          }
        });
        arr.forEach((line, idx) => {
          if (line.includes(parentRes)) {
            if (line.includes("<name>") || line.includes("<blockRef")) {
              newArr = arr.slice(0, idx + 1).reverse();
              res = newArr.find((el) => {
                return el.includes("<key>");
              });
              if (res === undefined) {
                console.log("\t\t", idx + 1, line);
              } else {
                console.log("\t\t", arr.indexOf(res, 0) + 1, res);
              }
            }
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
console.log("\n" + argument + " is found in:");
getDir(dir);