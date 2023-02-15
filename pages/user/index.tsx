/* IMPORTS */
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { AppContext } from "next/app";
import React, { useContext, useEffect, useState } from "react";
import SectionPaperContent from "../../components/SectionPaperContent";
import { RoutinesType } from "../../types/routine";
import MobileProtectedLayout, {
  UserDbIdContext,
} from "../../components/MobileProtectedLayout";
import { getSession, signOut, useSession } from "next-auth/react";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import CompactRoutineItemCard from "../../components/CompactRoutineItemCard";
import { CtxOrReq } from "next-auth/client/_utils";

/* TYPES */
interface PropsType {
  userSubmittedRoutines: RoutinesType[];
  userActiveRoutine: RoutinesType;
}

export async function getServerSideProps(context: CtxOrReq) {
  const session = await getSession(context);

  if (session == undefined) return;
  if (session.user == undefined) return;
  if (session.user.email == undefined) return;

  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  // Find user database entry ID

  let res = await fetch(`${apiBaseUrl}/api/user/findUserDbId`, {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
  });

  const { data: userDbId } = await res.json();

  res = await fetch(`${apiBaseUrl}/api/user/getUserRoutines`, {
    method: "POST",
    body: JSON.stringify({ ...userDbId }),
  });

  const { data: routines } = await res.json();

  // Retrieve user's active routine IDs
  res = await fetch(`${apiBaseUrl}/api/user/getActiveRoutine`, {
    method: "POST",
    body: JSON.stringify({ ...userDbId }),
  });

  const { data: activeRoutineId } = await res.json();

  // Retrieve full routine entry using the routine ID
  res = await fetch(`${apiBaseUrl}/api/routines/getSingleRoutine`, {
    method: "POST",
    body: JSON.stringify({ routineDbId: activeRoutineId.activeRoutineId }), // TODO fix this double nested fields issue
  });

  const { data: singleRoutine } = await res.json();

  return {
    props: {
      userSubmittedRoutines: routines,
      userActiveRoutine: singleRoutine.singleRoutine, // TODO fix double nested issue
    },
  };
}

const Index = ({ userSubmittedRoutines, userActiveRoutine }: PropsType) => {
  /* STATE */
  const [username, setUsername] = useState<string>("");

  /* HOOKS */
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      session == undefined ||
      session.user == undefined ||
      session.user.name == undefined
    )
      return;

    console.log(userActiveRoutine);

    setUsername(session.user.name);
  }, [session]);

  /* COMPONENT FUNCTIONS */

  const handleSubmitNewRoutineClick = () => {
    router.push("/user/submitNewRoutine");
  };

  // TODO Use mobile layout if on mobile and normal layout if on PC

  /* JSX */
  return (
    <MobileProtectedLayout>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h2" textAlign={"center"}>
              Welcome back, {username.split(" ")[0]} 😃
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {/* TODO Add functionality to this section */}
          <SectionPaperContent heading="Notifications">
            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                display: "flex",
                padding: 1,
                alignItems: "center",
              }}
            >
              <Box sx={{ flexGrow: 4 }}>
                <Typography variant="body2">
                  You have not submitted a routine yet
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <IconButton>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Paper>
          </SectionPaperContent>
        </Grid>

        <Grid item xs={12}>
          {/* TODO Add functionality to this section */}
          <SectionPaperContent heading="Metrics">
            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                display: "flex",
                padding: 1,
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body2">
                  Metrics will appear here once you&apos;ve submitted at least
                  one routine
                </Typography>
              </Box>
            </Paper>
          </SectionPaperContent>
        </Grid>

        <Grid item xs={12}>
          <SectionPaperContent heading="Active Routine">
            {userActiveRoutine && (
              <CompactRoutineItemCard routineItem={userActiveRoutine} />
            )}
          </SectionPaperContent>
        </Grid>

        <Grid item xs={12}>
          <SectionPaperContent heading="My Routine">
            <>
              {userSubmittedRoutines && userSubmittedRoutines.length < 0 ? (
                userSubmittedRoutines.map((routine, idx) => (
                  <CompactRoutineItemCard routineItem={routine} key={idx} />
                ))
              ) : (
                <Button
                  onClick={handleSubmitNewRoutineClick}
                  size={"large"}
                  variant={"contained"}
                >
                  Submit Routine
                </Button>
              )}
            </>
          </SectionPaperContent>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            size="large"
            sx={{ fontSize: "large" }}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </Grid>
      </Grid>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default Index;
