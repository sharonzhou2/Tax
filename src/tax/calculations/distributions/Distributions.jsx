import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CalculateTable from "./CalculateTable";

const Distributions = () => {
  const [files, setFiles] = useState(null);
  const [etf, setETF] = useState("");
  const [data, setData] = useState("");

  const etfOptions = ["Vanguard", "BetaShares"];
  const handleFileSelected = (e) => {
    setFiles(Array.from(e.target.files));
  };
  const handleUpload = (e) => {
    const formData = new FormData();

    formData.append("pdfFile", files[0]);
    formData.append("etfType", etf);

    fetch("/extract-distribution-text", {
      method: "post",
      body: formData,
    })
      .then((res) => {
        console.log("res", res);
        return res.text();
      })
      .then((res) => {
        setData(res);
      });
  };
  return (
    <Box p="1.5rem">
      <Box>
        <Typography
          textTransform="uppercase"
          letterSpacing="0.35rem"
          fontWeight="light"
          variant="h3"
          py={3}
        >
          Distributions
        </Typography>
        <Box display="flex" justifyContent="space-between" width="20%">
          <Box>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden onChange={handleFileSelected} />
            </Button>
          </Box>
          <Box>
            <Button variant="contained" onClick={handleUpload}>
              Upload PDF
            </Button>
          </Box>
        </Box>
        <Typography>{data}</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={etfOptions}
          sx={{ width: 300, py: "1rem" }}
          renderInput={(params) => <TextField {...params} label="Select ETF" />}
          onChange={(e, value) => setETF(value)}
        />

        <CalculateTable text={data}></CalculateTable>
      </Box>
    </Box>
  );
};

export default Distributions;
