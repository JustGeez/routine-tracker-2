/* IMPORTS */
import { Grid } from "@mui/material";
import { RequestContext } from "next/dist/server/base-server";
import React from "react";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";
import RoutineItemCard from "../../components/RoutineItemCard";
import { getAllRoutines } from "../../lib/dbActions";
import { RoutinesType } from "../../types/routine";

/* TYPES */
interface PropsType {
  allRoutines: RoutinesType[];
}

// TODO Implement mechanism to check for latest routines
export async function getServerSideProps(context: RequestContext) {
  const allRoutines = await getAllRoutines();

  return {
    props: {
      allRoutines,
    }, // will be passed to the page component as props
  };
}

const LatestRoutines = (props: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <MobileProtectedLayout>
      <Grid container spacing={2}>
        {props.allRoutines.map((routine, index) => (
          <Grid item xs={12} lg={6} key={index}>
            <RoutineItemCard routineItem={routine} />
          </Grid>
        ))}
      </Grid>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default LatestRoutines;
