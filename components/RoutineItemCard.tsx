"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
/* IMPORTS */
import React from "react";
import { routinesType } from "../types/routine";

/* TYPES */
interface PropsType {
  routineItem: routinesType;
}

const RoutineItemCard = ({ routineItem }: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Card
      sx={{
        padding: 2,
        bgcolor: "#444",
        minWidth: "300px",
        maxWidth: "350px",
        height: 350,
        margin: 1.5,
        scrollSnapAlign: "center",
      }}
    >
      <Typography variant="h6">{routineItem.name}</Typography>

      <CardContent>
        <Grid container>
          {routineItem.routine.map((item, idx) => (
            <Grid item xs={12} key={`${idx}-grid-item-card-box`}>
              <Box width={"100%"} display={"flex"}>
                <Typography variant="body1" flexGrow={1}>
                  {item.timeStart} - {item.timeEnd}
                </Typography>

                <Typography variant="body1" textAlign={"right"} flexGrow={4}>
                  {item.activity}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

/* EXPORTS */
export default RoutineItemCard;
