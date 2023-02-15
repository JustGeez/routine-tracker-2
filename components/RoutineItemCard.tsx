"use client";

/* IMPORTS */
import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RoutinesType } from "../types/routine";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserDbIdContext } from "./MobileProtectedLayout";

/* TYPES */
interface PropsType {
  routineItem: RoutinesType;
  showLikeButton: boolean;
}

const RoutineItemCard = ({ routineItem, showLikeButton }: PropsType) => {
  /* STATE */
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  /* HOOKS */
  const userDbId = useContext(UserDbIdContext);

  useEffect(() => {
    if (userDbId == "" || userDbId == undefined) return;
    if (routineItem.likes == undefined) return;

    const likedRoutines = routineItem.likes.find(
      (item) => item.userDbId == userDbId
    );

    likedRoutines == undefined
      ? setIsFavourite(false)
      : likedRoutines.userDbId == undefined
      ? setIsFavourite(false)
      : setIsFavourite(true);
  }, [userDbId, routineItem.likes]);

  /* COMPONENT FUNCTIONS */
  const handleFavouriteToggle = async (setAsFavouriteBool: boolean) => {
    let operation;

    setAsFavouriteBool ? (operation = "add") : (operation = "remove");

    if (userDbId == undefined || userDbId == null)
      return console.error("userDbId not defined or is null", userDbId);
    if (routineItem._id == undefined || routineItem._id == null)
      return console.error("routineDbId not defined or is null");
    if (operation == undefined || operation == null)
      return console.error("operation not defined");

    try {
      // Add or remove the routine item id from the users collection
      let result = await fetch("/api/user/updateLikes", {
        method: "POST",
        body: JSON.stringify({
          userDbId,
          routineDbId: routineItem._id,
          operation,
        }),
      });

      console.log("USER COLLECTION", await result.json()); //TODO make dev-only

      // Add or remove the user id from the routine collection
      result = await fetch("/api/routines/updateLikes", {
        method: "PUT",
        body: JSON.stringify({
          userDbId,
          routineDbId: routineItem._id,
          operation,
        }),
      });

      console.log("ROUTINE COLLECTION", await result.json()); //TODO remove or make dev-only

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
        {showLikeButton ? (
          isFavourite ? (
            <IconButton onClick={() => handleFavouriteToggle(false)}>
              <FavoriteIcon fontSize="medium" />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleFavouriteToggle(true)}>
              <FavoriteBorderIcon fontSize="medium" />
            </IconButton>
          )
        ) : (
          <></>
        )}
      </Box>

      <Box>
        <Typography variant="body1">Author: {routineItem.author}</Typography>
        <Typography variant="body1">
          Category: {routineItem.category}
        </Typography>
      </Box>

      <CardContent>
        <Grid container>
          {routineItem.routine.map((item, idx) => (
            <Grid item xs={12} key={`${idx}-grid-item-card-box`}>
              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                  paddingX: 1,
                  bgcolor: "#3f3f3f",
                }}
              >
                <Typography variant="body2">{item.timeStart}</Typography>
                <Typography variant="body2">{item.timeEnd}</Typography>
              </Box>
              <Box width={"100%"} sx={{ display: "flex", marginBottom: 1 }}>
                <Typography variant="body2" textAlign={"center"} flexGrow={4}>
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
