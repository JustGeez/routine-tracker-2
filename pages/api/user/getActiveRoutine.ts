import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/dbActions";
import { UserRecordType } from "../../../types/user";

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
    return res
      .status(500)
      .json({ data: {}, message: "ERROR: No user database ID defined!" });

  if (req.method == "POST") {
    const result = await db
      .collection("user-records")
      .findOne({ userDbId: new ObjectId(userDbId) });

    const { activeRoutine } = result as UserRecordType;

    return res.status(200).json({
      data: { activeRoutineId: activeRoutine },
      message: "Successfully retrieved user's active routine",
    });
  }
}
