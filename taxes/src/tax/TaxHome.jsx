import React from "react";
import { Box, Button } from "@mui/material";
import Calculator from "./calculations/Calculator";

const TaxHome = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
        }}
        display="flex"
        justifyContent="center"
      >
        <Button
          sx={{
            marginTop: "5rem",
            alignItems: "center",
          }}
          variant="contained"
        >
          Upload PDF
        </Button>
      </Box>
      <Calculator></Calculator>
    </Box>
  );
};

export default TaxHome;
