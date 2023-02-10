/* IMPORTS */
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Container } from "@mui/material";
import React from "react";

/* TYPES */
interface PropsType {
  children: ReactJSXElement | ReactJSXElement[];
}

const PublicLayout = ({ children }: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return <Container sx={{ padding: { xs: 1.5, sm: 2 } }}>{children}</Container>;
};

/* EXPORTS */
export default PublicLayout;
