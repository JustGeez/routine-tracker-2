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
    return res
      .status(500)
      .json({ data: {}, message: "ERROR: No user database ID defined!" });

  if (req.method == "POST") {
    const routines = await db
      .collection("routines")
      .find({ userDbId })
      .toArray();

    return res.status(200).json({
      data: routines,
      message: "Successfully retrieved user's routines",
    });
  }
}
