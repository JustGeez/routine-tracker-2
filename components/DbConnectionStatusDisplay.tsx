"use client";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
/* IMPORTS */
import React from "react";

/* TYPES */
interface PropsType {
  isDbConnectedProps: {
    isConnected: boolean;
  };
}

const DbConnectionStatusDisplay = ({ isDbConnectedProps }: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Box width={"100%"} textAlign={"right"} padding={1}>
      {isDbConnectedProps.isConnected ? (
        <Typography variant="body1" color={"green"}>
          DB STATUS: CONNECTED
        </Typography>
      ) : (
        <Typography variant="body1" color={"red"}>
          DB STATUS: NOT CONNECTED
        </Typography>
      )}
    </Box>
  );
};

/* EXPORTS */
export default DbConnectionStatusDisplay;
