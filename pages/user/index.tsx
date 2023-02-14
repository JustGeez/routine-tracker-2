/* IMPORTS */
import { Box, Grid, Typography } from "@mui/material";
import { AppContext } from "next/app";
import React from "react";
import RoutineEntryForm from "../../components/RoutineEntryForm";
import SectionPaperContent from "../../components/SectionPaperContent";
import { getAllRoutines } from "../../lib/dbActions";
import { RoutinesType } from "../../types/routine";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";

export async function getServerSideProps(context: AppContext) {
  const allRoutines = await getAllRoutines();

  return {
    props: {
      allRoutines,
    }, // will be passed to the page component as props
  };
}

/* TYPES */
interface PropsType {
  allRoutines: RoutinesType[];
}

const Index = (props: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  // TODO Use mobile layout if on mobile and normal layout if on PC

  /* JSX */
  return (
    <MobileProtectedLayout>
      <Typography>You have not submitted a routine yet</Typography>
      <SectionPaperContent heading="Submit a Routine">
        <RoutineEntryForm />
      </SectionPaperContent>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default Index;
