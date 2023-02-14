"use client";

/* IMPORTS */
import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RoutineItemCard from "./RoutineItemCard";
import { Box } from "@mui/system";
import { RoutinesType } from "../types/routine";

/* TYPES */
interface PropsType {
  isOpen: boolean;
  title: string;
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

const ConfirmDataDialog = ({
  isOpen,
  title,
  routine,
  handleCloseFunction,
}: PropsType) => {
  /* STATE */
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>();

  /* HOOKS */

  /* COMPONENT FUNCTIONS */
  const delayResetState = () => {
    setTimeout(() => {
      setHasSubmitted(false);
      setSubmissionSuccess(undefined);
    }, 1000);
  };

  const handleSuccessClick = async () => {
    // Post routine entry to DB
    try {
      const routineEntryObject: RoutinesType = { ...routine };
      // Post unique routine to database
      const res = await fetch(`/api/routines/singleRoutine`, {
        method: "POST",
        body: JSON.stringify(routineEntryObject),
      });

      if (res.status == 200) {
        setHasSubmitted(true);
        setSubmissionSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setSubmissionSuccess(false);
    }
  };

  const handleFailClick = () => {
    handleCloseFunction();
    delayResetState();
  };

  const handleSuccessCloseClick = () => {
    handleCloseFunction();
  };

  /* JSX */
  return (
    <Dialog open={isOpen} fullScreen TransitionComponent={Transition}>
      {!hasSubmitted && (
        <Box
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          bgcolor={"#223"}
        >
          <DialogTitle variant="h4">{title}</DialogTitle>

          <Box sx={{ overflowY: "scroll" }}>
            <RoutineItemCard
              routineItem={routine}
              key={"dialogue-card"}
              showLikeButton={false}
            />
          </Box>

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
      )}

      {hasSubmitted ? (
        submissionSuccess ? (
          <Box
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            alignItems={"center"}
            bgcolor={"#223"}
          >
            <Typography variant={"h2"} textAlign={"center"}>
              Success!
            </Typography>
            <Typography variant={"body1"} textAlign={"center"}>
              Thanks for sharing your routine
            </Typography>
            <Typography variant={"body1"} textAlign={"center"}>
              You may have changed someone&apos;s life for the better
            </Typography>
            <Button
              variant="outlined"
              color="info"
              sx={{ width: "40%" }}
              onClick={handleSuccessCloseClick}
            >
              <Typography variant="h4">Close</Typography>
            </Button>
          </Box>
        ) : (
          <Box
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            alignItems={"center"}
            bgcolor={"#223"}
          >
            <Typography variant={"h2"} textAlign={"center"}>
              Oops! We weren&apos;t able to get your routine
            </Typography>
            <Typography variant={"body1"} textAlign={"center"}>
              Please try again in a bit.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "40%" }}
              onClick={handleFailClick}
            >
              <Typography variant="h4">Close</Typography>
            </Button>
          </Box>
        )
      ) : (
        <></>
      )}
    </Dialog>
  );
};

/* EXPORTS */
export default ConfirmDataDialog;
