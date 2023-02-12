import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/dbActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();

  if (db == null)
    return res
      .status(500)
      .json({ data: {}, message: "Cannot connect to database" });

  if (req.method == "GET") {
    const trendingRoutines = await db
      .collection("trending-routines")
      .find({})
      .toArray();

    return res
      .status(200)
      .json({
        data: { trendingRoutines },
        message: "Successfully retrieved trending routines from database",
      });
  }
}
