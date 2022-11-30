import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Calculator = () => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Box p={5}>
      <Typography variant="h2">Calculate Taxes</Typography>
      {/* <p>{!data ? "Loading..." : data}</p> */}

      <p>To begin calculating your taxes, do the following steps: </p>
      <p>1. Upload your relevant distributions / dividends</p>
      <p>
        2. Select the type of Managed Fund Distribution/ETF or Company paying
        out the dividend
      </p>
      <p>3. Click upload PDF</p>

      <p>
        Once you have finished uploading all the relevant documents, you can
        reorder or fix any of the data as you see fit. After you have finished,
        you can also choose to export your documents to a CSV file for further
        processing
      </p>
    </Box>
  );
};

export default Calculator;
