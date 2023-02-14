/* IMPORTS */
import { Button, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CtxOrReq } from "next-auth/client/_utils";
import React, { useEffect, useState } from "react";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";
import RoutineItemCard from "../../components/RoutineItemCard";
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

    const filteredRoutines = props.allRoutines.filter((routineItem) =>
      routineItem.name.includes(searchName)
    );

    setVisibleRoutines(filteredRoutines);
  }, [searchName, props.allRoutines]);

  /* COMPONENT FUNCTIONS */
  // const onSearchClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
  //   setSearchName(e.currentTarget.)
  // };

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
              display: "flex",
            }}
          >
            <TextField
              placeholder="Enter name of routine"
              size={"medium"}
              sx={{ flexGrow: 10 }}
              onChange={onChangeSearchTextHandler}
            />
            <Box sx={{ flexGrow: 0.5 }}></Box>
            <Button variant="contained" sx={{ flexGrow: 1 }}>
              Search
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {visibleRoutines &&
              visibleRoutines.map((routine, idx) => (
                <Grid item xs={12} xl={6} key={idx}>
                  <RoutineItemCard routineItem={routine} />
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
