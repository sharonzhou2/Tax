import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Dividends = () => {
  const dividendData = JSON.parse(localStorage.getItem("dividends"));

  const convertCurrencyToInteger = (currency) => {
    return Number(currency.replace(/[^0-9.-]+/g, ""));
  };
  return (
    <>
      <Typography variant="h4" py={3}>
        Total Dividends
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
        <Grid item xs={6} key={"13C"}>
          Unfranked Amount
        </Grid>
        <Grid item xs={6}>
          $
          {dividendData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["UF"]) + acc;
          }, 0)}
        </Grid>
        <Grid item xs={6} key={"13U"}>
          Franked Amount
        </Grid>

        <Grid item xs={6}>
          $
          {dividendData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["FA"]) + acc;
          }, 0)}
        </Grid>

        <Grid item xs={6} key={"13Q"}>
          Gross Amount
        </Grid>

        <Grid item xs={6}>
          $
          {dividendData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["GA"]) + acc;
          }, 0)}
        </Grid>
        <Grid item xs={6} key={"18A"}>
          Franking Credit
        </Grid>

        <Grid item xs={6}>
          $
          {dividendData.reduce((acc, curr) => {
            return convertCurrencyToInteger(curr["FC"]) + acc;
          }, 0)}
        </Grid>
      </Grid>
    </>
  );
};

export default Dividends;
