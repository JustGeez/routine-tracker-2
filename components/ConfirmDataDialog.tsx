"use client";

/* IMPORTS */
import React, { useState } from "react";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import RoutineItemCard from "./RoutineItemCard";
import { Box } from "@mui/system";
import { RoutinesType } from "../types/routine";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  /* COMPONENT FUNCTIONS */
  const delayResetState = () => {
    setTimeout(() => {
      setHasSubmitted(false);
      setSubmissionSuccess(undefined);
    }, 1000);
  };

  const handleSuccessClick = async () => {
    if (!session?.user?.name || !session.user.email)
      return console.error("No session for this user!");

    // Post routine entry to DB
    try {
      // Find user ID in user database
      let res = await fetch(`/api/findUserId`, {
        method: "POST",
        body: JSON.stringify({
          name: session.user.name,
          email: session.user.email,
        }),
      });

      const { data } = await res.json();

      const { userId } = data;

      if (userId == null) return setSubmissionSuccess(false);

      // Post unique routine to database
      res = await fetch(`/api/routine`, {
        method: "POST",
        body: JSON.stringify({
          name: routine.name,
          routine: routine.routine,
          userId,
        }),
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
