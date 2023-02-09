/* IMPORTS */
import { Box, Grid, Typography } from "@mui/material";
import { AppContext } from "next/app";
import React, { useEffect } from "react";
import HorizontalScrollCards from "../../components/HorizontalScrollCards";
import RoutineBrowsingGrid from "../../components/RoutineBrowsingGrid";
import RoutineEntryForm from "../../components/RoutineEntryForm";
import SectionPaperContent from "../../components/SectionPaperContent";
import { connectToDatabase, getAllRoutines } from "../../lib/dbActions";
import { routinesType } from "../../types/routine";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";

export async function getServerSideProps(context: AppContext) {
  const DbConnectionStatusProps = await connectToDatabase();
  const allRoutinesProps = await getAllRoutines();

  return {
    props: {
      DbConnectionStatusProps,
      allRoutinesProps,
    }, // will be passed to the page component as props
  };
}

interface allRoutinesPropsType {
  props: {
    allRoutines: routinesType[];
  };
}

/* TYPES */
interface PropsType {
  allRoutinesProps: allRoutinesPropsType;
}

const Index = (props: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  // TODO Use mobile layout if on mobile and normal layout if on PC

  /* JSX */
  return (
    <MobileProtectedLayout>
      {/* LOGO */}
      <Box
        boxShadow={"0px 0px 10px white"}
        borderRadius={1}
        marginTop={-2}
        paddingY={1}
      >
        <Typography variant="h1" textAlign={"center"}>
          Routine Tracker
        </Typography>
      </Box>

      <br />
      <br />

      {/* LATEST ROUTINES */}

      <Grid container spacing={3}>
        {/* SUBMIT ROUTINE */}

        <Grid item xs={12}>
          <Typography>You have not submitted a routine yet</Typography>
          <SectionPaperContent heading="Submit a Routine">
            <RoutineEntryForm />
          </SectionPaperContent>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* FOOTER */}
      <Box
        boxShadow={"0px 0px 10px white"}
        borderRadius={1}
        marginBottom={-4}
        paddingY={2}
      >
        <Typography variant="body1" textAlign={"center"}>
          Routine Tracker &copy; 2023
        </Typography>
      </Box>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default Index;
