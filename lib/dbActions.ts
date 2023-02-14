import { CtxOrReq } from "next-auth/client/_utils";
import { getSession } from "next-auth/react";
import clientPromise from "./mongodb";

// TODO move to file that is not used by client
export const connectToDatabase = async () => {
  try {
    // await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    return db;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAllRoutines = async () => {
  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  let res = await fetch(`${apiBaseUrl}/api/routines/allRoutines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const allRoutines = await res.json();

  return allRoutines;
};

export const getLatestRoutines = async () => {
  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  let res = await fetch(`${apiBaseUrl}/api/routines/getLatestRoutines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const { data: latestRoutines } = await res.json();

  return latestRoutines;
};

export const getSpecifiedRoutine = async (context: CtxOrReq) => {
  const session = await getSession(context);

  if (session == undefined)
    return console.error("ERROR: Get specified routine: session undefined");
  if (session.user == undefined)
    return console.error(
      "ERROR: Get specified routine: session.user undefined"
    );

  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  // Find userDbId in user database
  let res = await fetch(`${apiBaseUrl}/api/user/findUserDbId`, {
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
};
