import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const Calculator = ({ text }) => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Box p="2rem">
      <Typography variant="h2">Calculate Taxes</Typography>
      <p>{!data ? "Loading..." : data}</p>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default Calculator;
