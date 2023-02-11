"use client";

/* IMPORTS */
import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { routinesType } from "../types/routine";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSession } from "next-auth/react";
import { UserIdContext } from "./MobileProtectedLayout";

/* TYPES */
interface PropsType {
  routineItem: routinesType;
}

const RoutineItemCard = ({ routineItem }: PropsType) => {
  /* STATE */
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  /* HOOKS */
  const userId = useContext(UserIdContext);

  useEffect(() => {
    if (userId == "" || userId == undefined) return;
    if (routineItem.likes == undefined) return;

    setIsFavourite(routineItem.likes.includes(userId));
  }, [userId, routineItem.likes]);

  /* COMPONENT FUNCTIONS */
  const handleFavouriteToggle = async (setAsFavouriteBool: boolean) => {
    let operation;

    setAsFavouriteBool ? (operation = "add") : (operation = "remove");

    console.log(userId);

    if (userId == undefined || userId == null)
      return console.error("userId not defined or is null", userId);
    if (routineItem._id == undefined || routineItem._id == null)
      return console.error("routineId not defined or is null");
    if (operation == undefined || operation == null)
      return console.error("operation not defined");

    try {
      // Add or remove the routine item id from the users collection
      let result = await fetch("/api/user/updateLikes", {
        method: "POST",
        body: JSON.stringify({ userId, routineId: routineItem._id, operation }),
      });

      console.log("USER COLLECTION", await result.json());

      // Add or remove the user id from the routine collection
      result = await fetch("/api/routines/singleRoutine", {
        method: "PUT",
        body: JSON.stringify({
          userId,
          routineId: routineItem._id,
          operation,
        }),
      });

      console.log("ROUTINE COLLECTION", await result.json());

      setIsFavourite(setAsFavouriteBool);
    } catch (error) {
      console.log(error);
    }
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
        {isFavourite ? (
          <IconButton onClick={() => handleFavouriteToggle(false)}>
            <FavoriteIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleFavouriteToggle(true)}>
            <FavoriteBorderIcon fontSize="large" />
          </IconButton>
        )}
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
