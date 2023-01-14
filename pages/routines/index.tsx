/* IMPORTS */
import { Box, Grid, Typography } from "@mui/material";
import { AppContext } from "next/app";
import React, { useEffect } from "react";
import HorizontalScrollCards from "../../components/HorizontalScrollCards";
import ProtectedLayout from "../../components/ProtectedLayout";
import RoutineBrowsingGrid from "../../components/RoutineBrowsingGrid";
import RoutineEntryForm from "../../components/RoutineEntryForm";
import SectionPaperContent from "../../components/SectionPaperContent";
import { connectToDatabase, getAllRoutines } from "../../lib/dbActions";
import { routinesType } from "../../types/routine";

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

  /* JSX */
  return (
    <ProtectedLayout>
      {/* HEADER */}
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
        <Grid item xs={12}>
          <SectionPaperContent heading="Latest Routines">
            <HorizontalScrollCards
              routinesList={props.allRoutinesProps.props.allRoutines}
            />
          </SectionPaperContent>
        </Grid>

        {/* TRENDING ROUTINES */}

        <Grid item xs={12}>
          <SectionPaperContent heading="Trending Routines">
            <HorizontalScrollCards
              routinesList={props.allRoutinesProps.props.allRoutines}
            />
          </SectionPaperContent>
        </Grid>

        {/* SUBMIT ROUTINE */}

        <Grid item xs={12}>
          <SectionPaperContent heading="Submit a Routine">
            <RoutineEntryForm />
          </SectionPaperContent>
        </Grid>

        {/* BROWSE ROUTINES */}

        <Grid item xs={12}>
          <SectionPaperContent heading={"Browse Routines"}>
            <RoutineBrowsingGrid
              routinesList={props.allRoutinesProps.props.allRoutines}
            />
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
    </ProtectedLayout>
  );
};

/* EXPORTS */
export default Index;
