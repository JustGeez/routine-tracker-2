"use client";

/* IMPORTS */
import React from "react";
import { Paper, Typography } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

/* TYPES */
interface PropsType {
  heading: string;
  children: ReactJSXElement;
}

const SectionPaperContent = ({ heading, children = <></> }: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Paper
      variant="elevation"
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">{heading}</Typography>
      {children}
    </Paper>
  );
};

/* EXPORTS */
export default SectionPaperContent;
