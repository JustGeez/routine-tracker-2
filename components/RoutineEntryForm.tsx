"use client";

/* IMPORTS */
import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { activityListType } from "../types/routine";
import ConfirmDataDialog from "./ConfirmDataDialog";

/* TYPES */
interface PropsType {}

const RoutineEntryForm = ({}: PropsType) => {
  /* STATE */
  const [userActivityList, setUserActivityList] = useState<activityListType[]>([
    { timeStart: "", timeEnd: "", activity: "" },
    { timeStart: "", timeEnd: "", activity: "" },
    { timeStart: "", timeEnd: "", activity: "" },
    { timeStart: "", timeEnd: "", activity: "" },
  ]);
  const [routineName, setRoutineName] = useState<string>("");

  // Dialogue Box state management
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const handleDialogOpen = () => {
    setConfirmDialogOpen(true);
  };
  const handleDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  /* HOOKS */

  /* COMPONENT FUNCTIONS */
  const onChangeActivityText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activityValue = event.target.value;
    const state = [...userActivityList];
    const len = state.length - 1;
    const index = Number(event.target.id);

    if (index > len) {
    } else {
      state[index] = {
        timeStart: state[index].timeStart,
        timeEnd: state[index].timeEnd,
        activity: activityValue,
      };
      setUserActivityList(state);
    }
  };

  const onChangeTimeStartText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const timeStartValue = event.target.value;
    const state = [...userActivityList];
    const len = state.length - 1;
    const index = Number(event.target.id);

    if (index > len) {
    } else {
      state[index] = {
        timeStart: timeStartValue,
        timeEnd: state[index].timeEnd,
        activity: state[index].activity,
      };
      setUserActivityList(state);
    }
  };
  const onChangeTimeEndText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeEndValue = event.target.value;
    const state = [...userActivityList];
    const len = state.length - 1;
    const index = Number(event.target.id);

    if (index > len) {
    } else {
      state[index] = {
        timeStart: state[index].timeStart,
        timeEnd: timeEndValue,
        activity: state[index].activity,
      };
      setUserActivityList(state);
    }
  };

  const onChangeRoutineName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;

    setRoutineName(nameValue);
  };

  const addNewRoutineEntry = () => {
    setUserActivityList((state) => [
      ...state,
      { timeStart: "", timeEnd: "", activity: "" },
    ]);
  };

  const removeRoutineEntry = (entryIdx: number) => {
    let tempState = [...userActivityList];
    const removedEntry = tempState.splice(entryIdx, 1);
    const userActivityListStateEntryRemoved = [...tempState];

    console.info("Removed:", removedEntry);

    setUserActivityList(userActivityListStateEntryRemoved);
  };

  const onRoutineSubmit = async () => {
    handleDialogOpen();
  };

  /* JSX */
  return (
    <>
      <ConfirmDataDialog
        title={"Did we hear you correctly?"}
        isOpen={confirmDialogOpen}
        routine={{ name: routineName, routine: userActivityList }}
        handleCloseFunction={handleDialogClose}
      />

      <Box
        width={{ xs: "100%", md: "60%", lg: "40%" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ padding: 2 }}>
              <TextField
                label={"name"}
                fullWidth
                onChange={onChangeRoutineName}
              />
            </Card>
          </Grid>

          {userActivityList.map((item, idx) => (
            <Grid item xs={12} key={`${idx}-grid-item`}>
              <Card key={`${idx}Card`} sx={{ padding: 2 }}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h4">Time Entry {idx + 1}</Typography>
                  <IconButton onClick={() => removeRoutineEntry(idx)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <br />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      id={String(idx)}
                      label="start time"
                      fullWidth
                      value={item.timeStart}
                      onChange={onChangeTimeStartText}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={String(idx)}
                      label="end time"
                      fullWidth
                      value={item.timeEnd}
                      onChange={onChangeTimeEndText}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id={String(idx)}
                      label="activity"
                      fullWidth
                      value={item.activity}
                      onChange={onChangeActivityText}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12}>
            <ButtonBase onClick={addNewRoutineEntry} sx={{ width: "100%" }}>
              <Card sx={{ marginBottom: 5, padding: 2, width: "100%" }}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: "grid", placeContent: "center" }}
                  >
                    <AddCircleIcon fontSize="large" />
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    sx={{ display: "grid", placeContent: "center" }}
                  >
                    <Typography variant="body1">Add new time entry</Typography>
                  </Grid>
                </Grid>
              </Card>
            </ButtonBase>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" onClick={onRoutineSubmit} fullWidth>
              <Typography variant="h4">Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

/* EXPORTS */
export default RoutineEntryForm;
