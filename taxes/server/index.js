const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
var pdf2table = require("pdf2table");
var fs = require("fs");
var os = require("os");
const { PdfReader } = require("pdfreader");
const { parsers } = require("./distributions");
const { divParsers } = require("./dividends"); // to ername this

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server! im superrrrrrrr. I love caluclating taxes :p",
  });
});

// Allows us to upload files and access the files
app.use(fileUpload());

var rows = {}; // indexed by y-position

const results = {};

var rest = [];

// Use to debug in the console
function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach((y) => {
      // console.log((rows[y] || []).join(""));
      rest.push((rows[y] || []).join(""));
    });

  [].concat.apply([], rest);
}

app.post("/extract-distribution-text", (req, res) => {
  const { etfType } = req.body;
  if (!req.files || !etfType) {
    res.status(400);
    res.end();
    return;
  }

  // console.log(req.files.pdfFile);

  new PdfReader().parseBuffer(req.files.pdfFile.data, function (err, item) {
    if (!item) {
      // end of file, or page
      printRows();
      // console.log(rows);
      parsers(etfType, results, rest);
      // getCategory(rest, results);
      // console.log(results);
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

// DIVIDEND READER
app.post("/extract-dividend-pdf", async (req, res) => {
  const { dividendType } = req.body;
  if (!req.files || !dividendType) {
    res.status(400);
    res.end();
    return;
  }

  pdf2table.parse(req.files.pdfFile.data, function (err, rows) {
    if (err) return console.log(err);

    const pdfRes = [];

    pdfRes.push(rows);

    divParsers(dividendType, results, pdfRes);
    res.send(results);

    return pdfRes;
  });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
