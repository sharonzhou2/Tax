import React from "react";
import { Help, InfoRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = "/about";
    navigate(path);
  };
  return (
    <Box display="flex" py={1} alignItems="center" flexDirection="column">
      {/* <Box display="flex" py={5} alignItems="center" flexDirection="column"> */}
      <IconButton onClick={handleClick}>
        <Help color="primary" />
      </IconButton>
      {/* Help!! */}
      {/* </Box> */}
    </Box>
  );
};

export default Info;
