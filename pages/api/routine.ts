// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/dbActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  if (db == null)
    return res.status(500).json({ message: "Cannot connect to database" });

  switch (req.method) {
    case "GET":
      const allRoutines = await db.collection("routines").find({}).toArray();
      res.status(200).json({ data: allRoutines });
      break;

    case "POST":
      const bodyObject = JSON.parse(req.body);
      const routine = await db.collection("routines").insertOne(bodyObject);
      res.status(200).json(routine.insertedId);
      break;

    default:
      res.status(200).json({ message: "No valid request method received" });
  }
}
