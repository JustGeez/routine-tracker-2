"use client";

/* IMPORTS */
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { routinesType } from "../types/routine";
import RoutineItemCard from "./RoutineItemCard";

/* TYPES */
interface PropsType {
  routinesList: routinesType[];
}

const HorizontalScrollCards = ({ routinesList }: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      sx={{
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
      }}
    >
      {routinesList ? (
        routinesList.map((item, itemIdx) => (
          <RoutineItemCard
            routineItem={item}
            key={`${itemIdx}-horizontal-scroll-card`}
          />
        ))
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

/* EXPORTS */
export default HorizontalScrollCards;