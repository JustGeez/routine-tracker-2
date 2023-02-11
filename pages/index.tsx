/* IMPORTS */
import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PublicLayout from "../components/PublicLayout";
import RoutineItemCard from "../components/RoutineItemCard";
import MainLogo from "../public/MainLogo.jpg";
import { routinesType } from "../types/routine";

/* TYPES */
interface PropsType {}

const EXAMPLE_ROUTINE_ITEM: routinesType = {
  _id: "63d3c982469de49793fc66bf",
  name: "Ludwig Mozart",
  routine: [
    { timeStart: "05:00", timeEnd: "", activity: "Wake-up" },
    {
      timeStart: "05:30",
      timeEnd: "06:00",
      activity: "Listen to previous day's music with eye's closed",
    },
    { timeStart: "06:00", timeEnd: "06:30", activity: "Bath with cold water" },
    {
      timeStart: "06:30",
      timeEnd: "07:00",
      activity: "Black coffee with carb-free breakfast",
    },
    {
      timeStart: "07:00",
      timeEnd: "10:00",
      activity: "Freestyle piano session",
    },
    { timeStart: "10:00", timeEnd: "12:00", activity: "Extended lunch time" },
    { timeStart: "12:00", timeEnd: "13:00", activity: "Afternoon nap in sun" },
    { timeStart: "13:00", timeEnd: "18:00", activity: "Compose music" },
    { timeStart: "18:00", timeEnd: "19:00", activity: "Cook and eat dinner" },
    { timeStart: "19:00", timeEnd: "20:00", activity: "Listen to some Bach" },
    { timeStart: "20:00", timeEnd: "21:00", activity: "Read current book" },
    { timeStart: "21:00", timeEnd: "", activity: "Sleep" },
  ],
  likes: ["63d3c982469de49793fc66bf"],
};

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
      <br />

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h2" textAlign={"center"}>
          Here&apos;s An Example Routine
        </Typography>
        <RoutineItemCard routineItem={EXAMPLE_ROUTINE_ITEM} />
      </Box>

      <br />
      <hr />
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
              <Link href={"/user"}>
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
              onClick={() => signIn("", { callbackUrl: "/user" })}
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
