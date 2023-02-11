import { ObjectId } from "mongodb";
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

  const { userDbId } = JSON.parse(req.body);

  if (userDbId == undefined)
    return res.status(500).json({
      data: { userDbId: null },
      message: "User database ID is undefined",
    });

  //   GET the IDs of the liked routines
  if (req.method == "POST") {
    const userRecord = await db
      .collection("user-records")
      .findOne({ userDbId: new ObjectId(userDbId) });

    console.log("USER RECORD", userRecord); // TODO make dev-only

    if (userRecord == null)
      return res.status(200).json({
        data: { likedRoutineIds: null },
        message: "User record returned null!",
      });

    const likedRoutineIds = userRecord.likes;

    return res.status(200).json({
      data: { likedRoutineIds },
      message: "Successfully found user liked routine IDs",
    });
  }

  return res.status(200).json({
    data: { userDbId: null },
    message: "No valid request method used",
  });
}
