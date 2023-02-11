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

  const { routineDbIds } = JSON.parse(req.body);

  if (routineDbIds == undefined)
    return res.status(500).json({
      data: { routines: null },
      message: "No valid routine database IDs received in request!",
    });

  const typedRoutineDbIds = routineDbIds.map(
    (item: string) => new ObjectId(item)
  );

  if (req.method == "POST") {
    // Retrieve the specified routines from the routine database
    const routines = await db
      .collection("routines")
      .find({ _id: { $in: typedRoutineDbIds } })
      .toArray();

    return res.status(200).json({
      data: { routines },
      message: "Successfully retried specified routines",
    });
  }
}
