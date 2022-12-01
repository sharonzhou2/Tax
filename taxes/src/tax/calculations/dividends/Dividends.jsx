import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DividendsTable from "./DividendsTable";

const Dividends = () => {
  const [files, setFiles] = useState(null);
  const [dividend, setDividends] = useState("");
  const [data, setData] = useState("");

  const dividendOptions = ["Macquarie", "CommBank"];
  const handleFileSelected = (e) => {
    setFiles(Array.from(e.target.files));
  };
  const handleUpload = (e) => {
    const formData = new FormData();

    formData.append("pdfFile", files[0]);
    formData.append("dividendType", dividend);

    fetch("/extract-dividend-pdf", {
      method: "post",
      body: formData,
    })
      .then((res) => {
        console.log(res);
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
          variant="h3"
          letterSpacing="0.35rem"
          fontWeight="light"
          textTransform="uppercase"
        >
          Dividends
        </Typography>
        <Box display="flex" justifyContent="center">
          {/* <Button variant="contained" component="label">
            Upload File */}
          <input type="file" onChange={handleFileSelected} />
          {/* </Button> */}
          <Button variant="contained" onClick={handleUpload}>
            Upload PDF
          </Button>
        </Box>
        <Typography>{data}</Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={dividendOptions}
          sx={{ width: 300, py: "1rem" }}
          renderInput={(params) => <TextField {...params} label="Select ETF" />}
          onChange={(e, value) => setDividends(value)}
        />

        <DividendsTable text={data}></DividendsTable>
      </Box>
    </Box>
  );
};

export default Dividends;
