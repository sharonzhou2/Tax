import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Distributions from "./Distributions";
import Dividends from "./Dividends";
import Income from "./Income";
import logo from "../../assets/male-tax.jpg";
import TaxCalc from "./TaxCalc";
import Deductions from "./Deductions";

const Summary = () => {
  return (
    <Box py={2} px={10}>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        justifyContent="center"
      >
        <Typography
          variant="h2"
          textTransform="uppercase"
          letterSpacing="0.5rem"
          mr="5rem"
        >
          SUMMARY
        </Typography>
        <img
          src={logo}
          alt="taxes"
          style={{
            width: "20rem",
          }}
        />
        {/* <p>{!data ? "Loading..." : data}</p> */}
      </Box>
      <Box mb={5}>
        <Income></Income>
        <Dividends></Dividends>
        <Distributions></Distributions>
        <Deductions></Deductions>
      </Box>

      <Divider />
      <Box py={5}>
        <TaxCalc></TaxCalc>
      </Box>
    </Box>
  );
};

export default Summary;
