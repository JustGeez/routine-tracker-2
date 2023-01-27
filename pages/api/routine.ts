// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
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
      const { name, routine, userId } = JSON.parse(req.body);

      const objectUserId = new ObjectId(userId);

      const { insertedId } = await db
        .collection("routines")
        .insertOne({ name, routine, userId: objectUserId });

      res.status(200).json(insertedId);
      break;

    default:
      res.status(200).json({ message: "No valid request method received" });
  }
}
