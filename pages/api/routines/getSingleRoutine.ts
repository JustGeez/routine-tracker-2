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

  const { routineDbId } = JSON.parse(req.body);

  console.log("ROUTINE ID", routineDbId);

  if (routineDbId == undefined)
    return res.status(500).json({
      data: {},
      message: "No valid routine database ID received in request!",
    });

  if (req.method == "POST") {
    // Retrieve the specified routines from the routine database
    const singleRoutine = await db
      .collection("routines")
      .findOne({ _id: new ObjectId(routineDbId) });

    return res.status(200).json({
      data: { singleRoutine },
      message: "Successfully retried specified routines",
    });
  }
}
