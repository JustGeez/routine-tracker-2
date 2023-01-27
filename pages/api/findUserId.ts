import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/dbActions";

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
      const { name, email } = JSON.parse(req.body);
      if (!name || !email)
        return res.status(500).json({
          data: { userId: null },
          message: "Missing name or email address in request!",
        });

      const user = await db.collection("users").findOne({ name, email });

      if (!user || !user._id)
        return res.status(500).json({
          data: { userId: null },
          message: "Cannot find valid user in database!",
        });

      return res
        .status(200)
        .json({ data: { userId: user._id }, message: "Found valid user" });
      break;
    default:
      return res
        .status(500)
        .json({ data: { userId: null }, message: "No valid request method" });
  }
}
