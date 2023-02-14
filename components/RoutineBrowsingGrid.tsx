"use client";

/* IMPORTS */
import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { RoutinesType } from "../types/routine";
import RoutineItemCard from "./RoutineItemCard";

/* TYPES */
interface PropsType {
  routinesList: RoutinesType[];
}

const RoutineBrowsingGrid = ({ routinesList }: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Grid container spacing={1}>
      {routinesList ? (
        routinesList.map((item, idx) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={4}
            key={`${idx}-browse-grid`}
            display={"flex"}
            justifyContent={"center"}
          >
            <RoutineItemCard
              routineItem={item}
              key={`${idx}-browse-card`}
              showLikeButton={false}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      )}
      <Grid item xs={12}>
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <Typography variant={"body1"}>&lt; 1 2 3 ... 8 &gt;</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

/* EXPORTS */
export default RoutineBrowsingGrid;
