import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/dbActions";
import { DUMMY_ROUTINES } from "../../../lib/dummy_routines";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();

  if (db == null)
    return res.status(500).json({ message: "Cannot connect to database" });

  switch (req.method) {
    case "GET":
      const bodyObject = JSON.parse(JSON.stringify(DUMMY_ROUTINES));
      const routines = await db.collection("routines").insertMany(bodyObject);
      res.status(200).json(JSON.stringify(routines.insertedIds));
      break;

    default:
      res.status(200).json({ body: "No valid request method received" });
  }
}
