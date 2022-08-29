import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Calculator from "./calculations/Calculator";

const TaxHome = () => {
  const [files, setFiles] = useState(null);
  const [data, setData] = useState("");

  const handleUpload = () => {
    const formData = new FormData();

    formData.append("pdfFile", files[0]);

    // Send the PDF file to the server side
    fetch("extract-text", {
      method: "post",
      body: formData,
    })
      .then((res) => {
        return res.text();
      })
      .then((extract) => {
        setData(extract);
      });
  };

  const handleFileSelected = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
        }}
        display="flex"
        justifyContent="center"
      >
        <Box display="flex" justifyContent="space-between" id="inputFile">
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden onChange={handleFileSelected} />
          </Button>
          <Button
            sx={{
              marginTop: "5rem",
              alignItems: "center",
            }}
            variant="contained"
            onClick={handleUpload}
          >
            Upload PDF
          </Button>
        </Box>
      </Box>
      <Calculator text={data}></Calculator>
    </Box>
  );
};

export default TaxHome;
