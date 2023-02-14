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
      .json({ data: {}, message: "ERROR: Cannot connect to database!" });

  if (req.method == "GET") {
    // Fetch all routines
    const allRoutines = (await db
      .collection("routines")
      .find({})
      .toArray()) as RoutinesType[];

    // Sort by descending order of timestamp
    allRoutines.sort((a, b) => Number(b.datePosted) - Number(a.datePosted));

    if (process.env.LATEST_ROUTINES_COUNT == undefined)
      return res.status(500).json({
        data: {},
        message: "ERROR: Latest routines count environment variable undefined!",
      });

    let latestRoutinesEndIdx = Number(process.env.LATEST_ROUTINES_COUNT);

    // Clip the end index if it's bigger than the array length
    if (latestRoutinesEndIdx > allRoutines.length) {
      latestRoutinesEndIdx = allRoutines.length - 1;
    }

    // Extract and return latest X routines
    const latestRoutines = allRoutines.splice(0, latestRoutinesEndIdx);

    return res.status(200).json({
      data: { latestRoutines },
      message: "INFO: Successfully retrieved latest routines from database",
    });
  }
}
