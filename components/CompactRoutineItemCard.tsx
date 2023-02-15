"use client";

/* IMPORTS */
import React, { useContext, useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RoutinesType } from "../types/routine";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import RoutineItemExpandDialog from "./RoutineItemExpandDialog";

/* TYPES */
interface PropsType {
  routineItem: RoutinesType;
}

const CompactRoutineItemCard = ({ routineItem }: PropsType) => {
  /* STATE */
  const [isExpandDialogOpen, setIsExpandDialogOpen] = useState<boolean>(false);
  const [numLikes, setNumLikes] = useState<number>(0);

  /* HOOKS */
  useEffect(() => {
    const getNumLikes = async () => {
      let res = await fetch("/api/routines/getNumLikes", {
        method: "POST",
        body: JSON.stringify({ routineDbId: routineItem._id }),
      });

      const { data: numberOfLikes } = await res.json();

      return numberOfLikes;
    };

    (async () => setNumLikes(await getNumLikes()))();
  }, [routineItem._id]);

  /* COMPONENT FUNCTIONS */
  const handleDialogClose = () => {
    setIsExpandDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setIsExpandDialogOpen(true);
  };

  /* JSX */
  return (
    <>
      <RoutineItemExpandDialog
        isOpen={isExpandDialogOpen}
        handleCloseFunction={handleDialogClose}
        routine={routineItem}
      />
      <Card
        onClick={handleDialogOpen}
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
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h6" sx={{ flexGrow: 3 }}>
            {routineItem.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EqualizerIcon fontSize="small" />
            <Typography variant="body1" fontSize={12}>
              {numLikes} {numLikes != 1 ? "Likes" : "Like"}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body1">Author: {routineItem.author}</Typography>
          <Typography variant="body1">
            Category: {routineItem.category}
          </Typography>
        </Box>
      </Card>
    </>
  );
};

/* EXPORTS */
export default CompactRoutineItemCard;
