/* IMPORTS */
import { Grid } from "@mui/material";
import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";
import MobileProtectedLayout from "../../components/MobileProtectedLayout";
import RoutineItemCard from "../../components/RoutineItemCard";
import { routinesType } from "../../types/routine";

/* TYPES */
interface PropsType {
  likedRoutines: { routines: routinesType[] };
}

export async function getServerSideProps(context: CtxOrReq) {
  const session = await getSession(context);

  if (session == undefined)
    return console.error("ERROR: LikedRoutines: session undefined");
  if (session.user == undefined)
    return console.error("ERROR: LikedRoutines: session.user undefined");

  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  // Find userDbId in user database
  let res = await fetch(`${apiBaseUrl}/api/user/findUserId`, {
    method: "POST",
    body: JSON.stringify({ email: session.user.email }),
  });

  const { data } = await res.json();

  const { userDbId } = data;

  console.log(userDbId);

  // Get liked routine Ids for found userDbId
  res = await fetch(`${apiBaseUrl}/api/user/getLikedRoutines`, {
    method: "POST",
    body: JSON.stringify({ userDbId }),
  });

  const { data: likedRoutines } = await res.json();

  const likedRoutineIds = likedRoutines.likedRoutineIds;

  console.log("LIKED ROUTINE IDS", likedRoutineIds); // TODO make dev-only

  // Get liked routines from routine database
  res = await fetch(`${apiBaseUrl}/api/routines/getSpecifiedRoutines`, {
    method: "POST",
    body: JSON.stringify({ routineDbIds: likedRoutineIds }),
  });

  const { data: routines } = await res.json();

  return {
    props: {
      likedRoutines: routines,
    },
  };
}

const LikedRoutines = (props: PropsType) => {
  /* STATE */

  /* HOOKS */
  useEffect(() => {
    console.log(props.likedRoutines.routines);
  }, []);

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <MobileProtectedLayout>
      <Grid container spacing={1}>
        {props.likedRoutines.routines &&
          props.likedRoutines.routines.map((item, idx) => (
            <Grid item xs={12} xl={6} key={idx}>
              <RoutineItemCard routineItem={item} />
            </Grid>
          ))}
      </Grid>
    </MobileProtectedLayout>
  );
};

/* EXPORTS */
export default LikedRoutines;
