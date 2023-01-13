"use client";

/* IMPORTS */
import React from "react";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RoutineItemCard from "./RoutineItemCard";
import { Box } from "@mui/system";
import { routinesType } from "../types/routine";

/* TYPES */
interface PropsType {
  isOpen: boolean;
  title: string;
  routine: routinesType;
  handleCloseFunction: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDataDialog = ({
  isOpen,
  title,
  routine,
  handleCloseFunction,
}: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */
  const handleSuccessClick = async () => {
    // Post routine entry to DB
    try {
      let res = await fetch(`/api/routine`, {
        method: "POST",
        body: JSON.stringify(routine),
      });

      console.log(res);

      if (res.status == 200) {
        //TODO Add confirmation visual feedback here
        console.info("Successfully posted routine entry");
        handleCloseFunction();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFailClick = () => {
    handleCloseFunction();
  };

  /* JSX */
  return (
    <Dialog open={isOpen} fullScreen TransitionComponent={Transition}>
      <Box
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
        alignItems={"center"}
        bgcolor={"#223"}
      >
        <DialogTitle variant="h4">{title}</DialogTitle>

        <RoutineItemCard routineItem={routine} key={"dialogue-card"} />

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"space-around"}
          padding={2}
        >
          <Button
            variant="outlined"
            color="success"
            sx={{ width: "40%" }}
            onClick={handleSuccessClick}
          >
            <Typography variant="h4">Yes</Typography>
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: "40%" }}
            onClick={handleFailClick}
          >
            <Typography variant="h4">No</Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

/* EXPORTS */
export default ConfirmDataDialog;
