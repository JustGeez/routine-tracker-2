/* IMPORTS */
import { Box, Grid, Typography } from "@mui/material";
import { AppContext } from "next/app";
import React, { useEffect } from "react";
import HorizontalScrollCards from "../components/HorizontalScrollCards";
import Layout from "../components/Layout";
import RoutineBrowsingGrid from "../components/RoutineBrowsingGrid";
import RoutineEntryForm from "../components/RoutineEntryForm";
import SectionPaperContent from "../components/SectionPaperContent";
import clientPromise from "../lib/mongodb";
import { routinesType } from "../types/routine";

const connectToDatabase = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

const getAllRoutines = async () => {
  // TODO add production url when final domain acquired

  let res = await fetch(`${process.env.BASE_URL}/api/routines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const { data: allRoutines } = await res.json();

  return {
    props: { allRoutines },
  };
};

export async function getServerSideProps(context: AppContext) {
  const DbConnectionStatusProps = await connectToDatabase();
  const allRoutinesProps = await getAllRoutines();

  return {
    props: {
      DbConnectionStatusProps,
      allRoutinesProps,
    }, // will be passed to the page component as props
  };
}

interface allRoutinesPropsType {
  props: {
    allRoutines: routinesType[];
  };
}

/* TYPES */
interface PropsType {
  allRoutinesProps: allRoutinesPropsType;
}

const Index = (props: PropsType) => {
  /* STATE */

  /* HOOKS */
  useEffect(() => {
    console.log(props);
  }, [props]);

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Layout title={"Home"}>
      {/* HEADER */}
      <Box
        boxShadow={"0px 0px 10px white"}
        borderRadius={1}
        marginTop={-2}
        paddingY={1}
      >
        <Typography variant="h1" textAlign={"center"}>
          Routine Tracker
        </Typography>
      </Box>

      <br />
      <br />

      {/* LATEST ROUTINES */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SectionPaperContent heading="Latest Routines">
            <HorizontalScrollCards
              routinesList={props.allRoutinesProps.props.allRoutines}
            />
          </SectionPaperContent>
        </Grid>

        {/* TRENDING ROUTINES */}

        <Grid item xs={12}>
          <SectionPaperContent heading="Trending Routines">
            <HorizontalScrollCards
              routinesList={props.allRoutinesProps.props.allRoutines}
            />
          </SectionPaperContent>
        </Grid>

        {/* SUBMIT ROUTINE */}

        <Grid item xs={12}>
          <SectionPaperContent heading="Submit a Routine">
            <RoutineEntryForm />
          </SectionPaperContent>
        </Grid>

        {/* BROWSE ROUTINES */}

        <Grid item xs={12}>
          <SectionPaperContent heading={"Browse Routines"}>
            <RoutineBrowsingGrid
              routinesList={props.allRoutinesProps.props.allRoutines}
            />
          </SectionPaperContent>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* FOOTER */}
      <Box
        boxShadow={"0px 0px 10px white"}
        borderRadius={1}
        marginBottom={-4}
        paddingY={2}
      >
        <Typography variant="body1" textAlign={"center"}>
          Routine Tracker &copy; 2023
        </Typography>
      </Box>
    </Layout>
  );
};

/* EXPORTS */
export default Index;
