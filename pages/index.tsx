/* IMPORTS */
import { Button, Card, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppContext } from "next/app";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HorizontalScrollCards from "../components/HorizontalScrollCards";
import PublicLayout from "../components/PublicLayout";
import { connectToDatabase, getAllRoutines } from "../lib/dbActions";
import MainLogo from "../public/MainLogo.jpg";
import { routinesType } from "../types/routine";

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

  const { data: session } = useSession();

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <PublicLayout>
      {/* LOGO */}
      <Box
        width={"100vw"}
        height={"23vw"}
        position="absolute"
        left={0}
        top={0}
        borderRadius={5}
      >
        <Image src={MainLogo} alt={"Main logo"} fill />
      </Box>

      <Box sx={{ marginTop: "23vw", overflow: "hidden" }}>
        <Typography variant="h3" marginTop={1} textAlign={"center"}>
          Where humans share their tried and tested daily routines with other
          humans
        </Typography>
      </Box>

      <hr />

      <Box>
        <Typography variant="body1" marginTop={1}>
          Almost everyone has found themselves at a point in life where things
          just don&apos;t seem to be working.
        </Typography>

        <Typography variant="body1" marginTop={1}>
          You aren&apos;t accomplishing what you want to in a day. You&apos;re
          left asking yourself, &ldquo;How do other people achieve their goals
          and I&apos;m struggling to?&rdquo;
        </Typography>

        <Typography variant="body1" marginTop={1}>
          Routine is a space to give and receive. It&apos;s a space for those
          with daily routines that are helping them achieve their goals to
          share. It&apos;s a space for those with daily routines which are not
          working for them. Routine is a place to find a new way of living, a
          new life.
        </Typography>
      </Box>

      <hr />

      <Box>
        <Typography variant="h2">Last 5 submitted routines</Typography>
        <HorizontalScrollCards
          routinesList={props.allRoutinesProps.props.allRoutines}
        />
      </Box>

      <br />

      <Card sx={{ padding: 2 }}>
        <Typography variant="h3" textAlign={"center"}>
          Sign in to access all routines and features
        </Typography>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          marginY={2}
        >
          {session ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography marginBottom={1}>
                You&apos;re already signed in and ready to go
              </Typography>
              <Link href={"/routines"}>
                <Button variant={"contained"} size={"large"} fullWidth>
                  Take me to the magic
                </Button>
              </Link>
              <Typography textAlign={"center"}>or</Typography>
              <Button
                variant={"outlined"}
                size={"large"}
                color="warning"
                fullWidth
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Button
              variant={"contained"}
              size={"large"}
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          )}
        </Box>
      </Card>

      <br />
      <hr />

      {/* FOOTER */}
      <Typography variant="body1" textAlign={"center"}>
        Routine Tracker &copy; 2023
      </Typography>
    </PublicLayout>
  );
};

/* EXPORTS */
export default Index;
