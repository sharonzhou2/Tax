const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const { PdfReader } = require("pdfreader");
var os = require("os");

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server! im superrrrrrrr. I love caluclating taxes :p",
  });
});

// Allows us to upload files and access the files
app.use(fileUpload());

var rows = {}; // indexed by y-position

var rest = [];

const results = {};

const getCategory = (line) => {
  const category = [
    "13U",
    "13C",
    "13Q",
    "13R",
    "13A",
    "18A",
    "18H",
    "20E",
    "20M",
    "20O",
  ];

  console.log(line);

  line.forEach((text, i) => {
    const found = text.split(" ").find((element) => category.includes(element));
    // console.log(text.split(" "));
    if (found) {
      // console.log(found);
      let indexOf = text.indexOf(found);
      let number = text.substring(indexOf + 3, indexOf + 11);

      if (!number.includes("$")) {
        number = line[i + 1].substring(0, 10);
      }
      if (number.includes("$")) {
        if (!results.category) {
          results[found] = number;
        }
      }
    }
  });
};

function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach((y) => {
      // console.log((rows[y] || []).join(""));
      rest.push((rows[y] || []).join(""));
    });

  [].concat.apply([], rest);
}

app.post("/extract-text", (req, res) => {
  if (!req.files) {
    res.status(400);
    res.end();
  }

  console.log(req.files.pdfFile);

  new PdfReader().parseBuffer(req.files.pdfFile.data, function (err, item) {
    if (!item) {
      // end of file, or page
      printRows();
      // console.log(rest);
      getCategory(rest);
      res.send(results);
      // console.log(results);
      //   console.log("PAGE:", item.page);
      rows = {}; // clear rows for next page
    } else if (item.text) {
      // accumulate text items into rows object, per line
      (rows[item.y] = rows[item.y] || []).push(" " + item.text);
    }
  });

  //   pdfParse(req.files.pdfFile).then((result) => {
  //     res.send(result.text);
  //   });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
