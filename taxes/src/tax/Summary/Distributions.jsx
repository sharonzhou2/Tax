import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Distributions = () => {
  const distributionData = JSON.parse(localStorage.getItem("distributions"));

  const convertCurrencyToInteger = (currency) => {
    return Number(currency.replace(/[^0-9.-]+/g, ""));
  };
  return (
    <>
      <Typography variant="h4" py={5}>
        Total Distributions
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid item xs={6} key={"13C"}>
          13C - Share of Net Income
        </Grid>
        <Grid item xs={6}>
          $
          {distributionData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["13C"]) + acc;
          }, 0)}
        </Grid>
        <Grid item xs={6} key={"13U"}>
          13U - Franked Distribution
        </Grid>

        <Grid item xs={6}>
          $
          {distributionData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["13U"]) + acc;
          }, 0)}
        </Grid>

        <Grid item xs={6} key={"13Q"}>
          13Q - Share of Franking Credit
        </Grid>

        <Grid item xs={6}>
          $
          {distributionData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["13Q"]) + acc;
          }, 0)}
        </Grid>
        <Grid item xs={6} key={"18A"}>
          18A - Net Capital Gains
        </Grid>

        <Grid item xs={6}>
          $
          {distributionData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["18A"]) + acc;
          }, 0)}
        </Grid>

        <Grid item xs={6} key={"18A"}>
          20E - Foreign Income
        </Grid>

        <Grid item xs={6}>
          $
          {distributionData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["20E"]) + acc;
          }, 0)}
        </Grid>
      </Grid>
    </>
  );
};

export default Distributions;
