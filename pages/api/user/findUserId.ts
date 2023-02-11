import type { NextApiRequest, NextApiResponse } from "next";
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

  switch (req.method) {
    case "POST":
      // Check that data is as expected

      const { email } = JSON.parse(req.body);
      if (!email)
        return res.status(500).json({
          data: { userDbId: null },
          message: "Missing email address in request!",
        });

      const user = await db.collection("users").findOne({ email });

      if (!user || !user._id)
        return res.status(500).json({
          data: { userDbId: null },
          message: "Cannot find valid user in database!",
        });

      return res
        .status(200)
        .json({ data: { userDbId: user._id }, message: "Found valid user" });
      break;
    default:
      return res
        .status(500)
        .json({ data: { userDbId: null }, message: "No valid request method" });
  }
}
