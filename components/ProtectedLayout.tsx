/* IMPORTS */
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

/* TYPES */
interface PropsType {
  children: ReactJSXElement | ReactJSXElement[];
}

const ProtectedLayout = ({ children }: PropsType) => {
  /* STATE */

  /* HOOKS */
  const { data: session } = useSession();

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Container sx={{ padding: { xs: 1.5, sm: 2 } }}>
      {session ? (
        <>{children}</>
      ) : (
        <Paper>
          <Typography variant="h2">Restricted: Sign-in to access</Typography>
        </Paper>
      )}
    </Container>
  );
};

/* EXPORTS */
export default ProtectedLayout;
