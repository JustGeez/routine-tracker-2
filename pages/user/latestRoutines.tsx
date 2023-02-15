/* IMPORTS */
import { Grid } from "@mui/material";
import { RequestContext } from "next/dist/server/base-server";
import React from "react";
import CompactRoutineItemCard from "../../components/CompactRoutineItemCard";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";
import { getLatestRoutines } from "../../lib/dbActions";
import { RoutinesType } from "../../types/routine";

/* TYPES */
interface PropsType {
  latestRoutines: RoutinesType[];
}

export async function getServerSideProps(context: RequestContext) {
  let LatestRoutines = await getLatestRoutines();

  return {
    props: {
      latestRoutines: [...LatestRoutines.latestRoutines], // TODO Clean up these redundant fields levels
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
        {props.latestRoutines &&
          props.latestRoutines.map((routine, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <CompactRoutineItemCard routineItem={routine} />
            </Grid>
          ))}
      </Grid>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default LatestRoutines;
