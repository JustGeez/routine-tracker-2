import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/dbActions";
import { RoutinesType } from "../../../types/routine";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();

  if (db == null)
    return res
      .status(500)
      .json({ data: {}, message: "Cannot connect to database" });

  if (req.method == "POST") {
    const { routineDbId } = JSON.parse(req.body);

    if (routineDbId == undefined)
      return res
        .status(200)
        .json({ data: {}, message: "ERROR: No routine ID included!" });

    // Fetch the routine entry
    const routine = (await db
      .collection("routines")
      .findOne({ _id: new ObjectId(routineDbId) })) as RoutinesType;

    // Count the number of likes for this routine
    const numberOfLikes = routine.likes.length;

    let stringNumberOfLikes = "0";

    // Format to compact readable format
    if (numberOfLikes < 1000) {
      stringNumberOfLikes = `${numberOfLikes}`;
    } else if (numberOfLikes == 1000) {
      stringNumberOfLikes = `${Math.floor(numberOfLikes / 1000)}K`;
    } else if (numberOfLikes > 1000) {
      stringNumberOfLikes = `${Math.floor(numberOfLikes / 1000)}.${Math.round(
        (numberOfLikes % 1000) / 100
      )}K`;
    }

    return res.status(200).json({
      data: stringNumberOfLikes,
      message: "Successfully retrieved routine like count",
    });
  }
}
