import { Box, Divider, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import { convertCurrencyToInteger, formatMoney } from "tax/Numbers";

const YearlyTaxCalc = (income) => {
  if (income <= 18200) return 0;

  if (income <= 45000) {
    return 0.19 * (income - 18200);
  }
  if (income <= 120000) {
    return 0.325 * (income - 45000) + 5092;
  }

  if (income <= 180000) {
    return 0.37 * (income - 120000) + 29467;
  }

  return 0.45 * (income - 180000) + 51667;
};

const TaxCalc = () => {
  const inc = localStorage.getItem("income");
  const dist = localStorage.getItem("distributions");
  const div = localStorage.getItem("dividends");

  let totalTaxableIncome = 0;
  let totalTaxWithheld = 0;
  let frankingCredits = 0;

  if (inc) {
    const incomes = JSON.parse(inc);
    totalTaxableIncome += incomes.reduce(
      (acc, curr) => acc + parseInt(curr.income),
      0
    );

    totalTaxWithheld += incomes.reduce(
      (acc, curr) => acc + parseInt(curr.tax),
      0
    );
  }

  if (dist) {
    const distributions = JSON.parse(dist);
    frankingCredits += distributions.reduce(
      (acc, curr) => acc + convertCurrencyToInteger(curr["13Q"]),
      0
    );

    totalTaxableIncome += distributions.reduce(
      (acc, curr) =>
        acc +
        convertCurrencyToInteger(curr["13C"]) +
        convertCurrencyToInteger(curr["13U"]) +
        convertCurrencyToInteger(curr["20E"]),
      0
    );
  }

  if (div) {
    const dividends = JSON.parse(div);
    frankingCredits += dividends.reduce(
      (acc, curr) => acc + convertCurrencyToInteger(curr["FA"]),
      0
    );
  }

  const taxOnTaxableIncome = YearlyTaxCalc(totalTaxableIncome);
  const totalPayableRefundable =
    taxOnTaxableIncome - totalTaxWithheld - frankingCredits;

  return (
    <Box p={5} border={4} borderRadius={5}>
      <Typography variant="h4" mb={3}>
        Tax Calculation
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          Total Taxable Income
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {formatMoney(totalTaxableIncome)}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Tax on your Taxable Income</Typography>
        <Typography variant="h6" fontWeight="bold">
          {formatMoney(taxOnTaxableIncome)}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Less: Franking Credits</Typography>
        <Typography variant="h6">({formatMoney(frankingCredits)})</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" pb={3}>
        <Typography variant="h6">Less: Tax Withheld</Typography>
        <Typography variant="h6">({formatMoney(totalTaxWithheld)})</Typography>
      </Box>
      <Divider></Divider>

      <Box display="flex" justifyContent="space-between" pt={3}>
        <Typography variant="h4">Total Payable / (Refundable)</Typography>
        <Typography variant="h4">
          {formatMoney(totalPayableRefundable)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaxCalc;
