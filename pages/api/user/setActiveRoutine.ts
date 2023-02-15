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

  const { userDbId, routineDbId } = JSON.parse(req.body);

  if (userDbId == undefined)
    return res
      .status(500)
      .json({ data: {}, message: "ERROR: No user database ID defined!" });

  if (routineDbId == undefined)
    return res
      .status(500)
      .json({ data: {}, message: "ERROR: No routine database ID defined!" });

  if (req.method == "POST") {
    const result = await db
      .collection("user-records")
      .updateOne(
        { userDbId: new ObjectId(userDbId) },
        { $set: { activeRoutine: new ObjectId(routineDbId) } }
      );

    return res.status(200).json({
      data: result,
      message: "Successfully set user's active routine",
    });
  }
}
