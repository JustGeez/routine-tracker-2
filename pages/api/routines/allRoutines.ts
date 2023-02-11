// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("routine");

  switch (req.method) {
    case "GET":
      const allRoutines = await db.collection("routines").find({}).toArray();
      res.status(200).json([...allRoutines]);
      break;
  }
}
