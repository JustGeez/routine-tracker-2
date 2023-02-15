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

  if (req.method == "POST") {
    const { userDbId } = JSON.parse(req.body);

    if (userDbId == undefined)
      return res
        .status(500)
        .json({ message: "ERROR: No valid user database entry ID given" });

    // Insert user into database if not exist
    // TODO: This is inefficient - replace with better code in future
    const userRecordDbId = await db.collection("user-records").updateOne(
      { userDbId: new ObjectId(userDbId) },
      {
        $setOnInsert: {
          userDbId: new ObjectId(userDbId),
          likes: [],
          activeRoutine: {},
        },
      },
      { upsert: true }
    );

    return res.status(200).json({
      data: { userRecordDbId },
      message: "User added successfully to records database",
    });
  }
}
