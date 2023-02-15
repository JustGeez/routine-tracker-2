// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("routine");

  switch (req.method) {
    case "POST":
      const bodyObject = JSON.parse(req.body);
      const routineId = await db.collection("routines").insertOne(bodyObject);
      res.status(200).json(routineId.insertedId);
      break;

    default:
      res.status(200).json({ message: "No valid request method received" });
  }
}
