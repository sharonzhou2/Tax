import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import HorizontalLabelPositionBelowStepper from "tax/Stepper";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/women-tax.jpg";
import Info from "tax/Info";

const Calculator = () => {
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/distributions`;
    navigate(path);
  };

  return (
    <>
      <Box p={5}>
        <Box display="flex" alignItems="center">
          <img
            src={logo}
            alt="taxes"
            style={{
              width: "20rem",
            }}
          />
          <Typography
            variant="h2"
            textTransform="uppercase"
            letterSpacing="0.5rem"
            ml="5rem"
          >
            Calculate Taxes
          </Typography>
          {/* <p>{!data ? "Loading..." : data}</p> */}
        </Box>

        <Typography variant="body1">
          To begin calculating your taxes, do the following steps:
        </Typography>
        <Box py={5}>
          <HorizontalLabelPositionBelowStepper></HorizontalLabelPositionBelowStepper>
        </Box>

        <Typography variant="subtitle1">
          1. Upload your relevant distributions / dividends
        </Typography>
        <Typography variant="subtitle1">
          2. Select the type of Managed Fund Distribution/ETF or Company paying
          out the dividend
        </Typography>
        <Typography variant="subtitle1">3. Click upload PDF </Typography>

        <Typography variant="subtitle1">
          Once you have finished uploading all the relevant documents, you can
          reorder or fix any of the data as you see fit. After you have
          finished, you can also choose to export your documents to a CSV file
          for further processing
        </Typography>

        <Box
          height="15rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="outlined"
            style={{
              minWidth: "15rem",
              minHeight: "5rem",
            }}
            onClick={routeChange}
          >
            Get Started Now
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Info></Info>
          <Typography>Made by Sharon Zhou</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Calculator;
