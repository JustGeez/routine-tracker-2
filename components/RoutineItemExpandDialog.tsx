"use client";

/* IMPORTS */
import React from "react";
import { Button, Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RoutineItemCard from "./RoutineItemCard";
import { Box } from "@mui/system";
import { RoutinesType } from "../types/routine";
import CloseIcon from "@mui/icons-material/Close";

/* TYPES */
interface PropsType {
  isOpen: boolean;
  routine: RoutinesType;
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

const RoutineItemExpandDialog = ({
  isOpen,
  routine,
  handleCloseFunction,
}: PropsType) => {
  /* STATE */

  /* HOOKS */

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Dialog open={isOpen} fullScreen TransitionComponent={Transition}>
      <Box sx={{ display: "grid", placeContent: "center", height: "100vh" }}>
        <Box sx={{ overflowY: "scroll" }}>
          <RoutineItemCard routineItem={routine} showLikeButton={true} />
        </Box>
        <Box
          sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="contained" size="large">
            Set as activate routine
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            onClick={handleCloseFunction}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

/* EXPORTS */
export default RoutineItemExpandDialog;
