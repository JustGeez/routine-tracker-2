/* IMPORTS */
import { Grid } from "@mui/material";
import { CtxOrReq } from "next-auth/client/_utils";
import React from "react";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";
import RoutineItemCard from "../../components/RoutineItemCard";
import { RoutinesType } from "../../types/routine";

/* TYPES */
interface PropsType {
  trendingRoutines: RoutinesType[];
}

export async function getServerSideProps(context: CtxOrReq) {
  // Get trending routines from database
  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  // Find userDbId in user database
  let res = await fetch(`${apiBaseUrl}/api/routines/getTrendingRoutines`, {
    method: "GET",
  });

  const { data: trendingRoutines } = await res.json(); // TODO fix why these responses are always nested within their field names twice

  return {
    props: {
      trendingRoutines: trendingRoutines.trendingRoutines,
    },
  };
}

const TrendingRoutines = (props: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <MobileProtectedLayout>
      <Grid container spacing={2}>
        {props.trendingRoutines &&
          props.trendingRoutines.map((routineItem, idx) => (
            <Grid item xs={12} xl={6} key={idx}>
              <RoutineItemCard
                routineItem={routineItem}
                showLikeButton={true}
              />
            </Grid>
          ))}
      </Grid>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default TrendingRoutines;
