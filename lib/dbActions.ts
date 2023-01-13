import clientPromise from "./mongodb";

export const connectToDatabase = async () => {
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

export const getAllRoutines = async () => {
  let apiBaseUrl;

  if (process.env.VERCEL == "1") {
    apiBaseUrl = `https://${process.env.VERCEL_URL}`;
  } else {
    apiBaseUrl = process.env.LOCAL_URL;
  }

  let res = await fetch(`${apiBaseUrl}/api/routines`, {
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
