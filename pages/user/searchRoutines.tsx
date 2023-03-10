/* IMPORTS */
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { CtxOrReq } from "next-auth/client/_utils";
import React, { useEffect, useState } from "react";
import CompactRoutineItemCard from "../../components/CompactRoutineItemCard";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";
import { getAllRoutines } from "../../lib/dbActions";
import { RoutinesType } from "../../types/routine";

/* TYPES */
interface PropsType {
  allRoutines: RoutinesType[];
}

export async function getServerSideProps(context: CtxOrReq) {
  const allRoutines = await getAllRoutines();

  return {
    props: {
      allRoutines,
    }, // will be passed to the page component as props
  };
}

const SearchRoutines = (props: PropsType) => {
  /* STATE */
  const [searchName, setSearchName] = useState<string>();
  const [visibleRoutines, setVisibleRoutines] = useState<RoutinesType[]>();

  /* HOOKS */
  useEffect(() => {
    if (searchName == undefined || searchName == "")
      return setVisibleRoutines(props.allRoutines);

    const filteredRoutines = props.allRoutines.filter(
      (routineItem) =>
        routineItem.name.includes(searchName) ||
        routineItem.author.includes(searchName)
    );

    setVisibleRoutines(filteredRoutines);
  }, [searchName, props.allRoutines]);

  /* COMPONENT FUNCTIONS */

  const onChangeSearchTextHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchName(e.target.value);
  };

  /* JSX */
  return (
    <MobileProtectedLayout>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 3,
            }}
          >
            <TextField
              placeholder="Enter name of routine"
              size={"medium"}
              onChange={onChangeSearchTextHandler}
              fullWidth
              sx={{ marginBottom: 1 }}
            />
            <Typography variant="body2" fontSize={14} textAlign={"center"}>
              The results will be filtered automatically as you type
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {visibleRoutines &&
              visibleRoutines.map((routine, idx) => (
                <Grid item xs={12} xl={6} key={idx}>
                  <CompactRoutineItemCard routineItem={routine} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default SearchRoutines;
