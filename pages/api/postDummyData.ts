import type { NextApiRequest, NextApiResponse } from "next";
import { DUMMY_ROUTINES } from "../../lib/dummy_routines";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("routine_tracker");

  switch (req.method) {
    case "POST":
      const bodyObject = JSON.parse(JSON.stringify(DUMMY_ROUTINES));
      const routines = await db.collection("routines").insertMany(bodyObject);
      res.status(200).json(JSON.stringify(routines.insertedIds));
      break;

    default:
      res.status(200).json({ body: "No valid request method received" });
  }
}
