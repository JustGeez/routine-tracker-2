"use client";

/* IMPORTS */
import React, { useState } from "react";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { routinesType } from "../types/routine";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/* TYPES */
interface PropsType {
  routineItem: routinesType;
}

const RoutineItemCard = ({ routineItem }: PropsType) => {
  /* STATE */
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  /* HOOKS */

  /* COMPONENT FUNCTIONS */
  const handleFavouriteToggle = () => {
    setIsFavourite(!isFavourite);
  };

  /* JSX */
  return (
    <Card
      sx={{
        padding: 2,
        bgcolor: "#444",
        minWidth: "300px",
        maxWidth: "350px",
        // height: 350,
        margin: 1.5,
        scrollSnapAlign: "center",
      }}
    >
      <Box display={"flex"}>
        <Typography variant="h6" sx={{ flexGrow: 3 }}>
          {routineItem.name}
        </Typography>
        <IconButton onClick={handleFavouriteToggle}>
          {isFavourite ? (
            <FavoriteIcon fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </IconButton>
      </Box>

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
