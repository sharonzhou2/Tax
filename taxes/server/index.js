const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from server! im superrrrrrrr. I love caluclating taxes :p",
  });
});

app.use(fileUpload());

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
