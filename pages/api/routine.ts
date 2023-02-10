// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Document, WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

type Data = {
  data: WithId<Document>[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("routine");

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
