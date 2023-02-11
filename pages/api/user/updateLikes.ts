import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/dbActions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();

  // Check database connection is valid
  if (db == null)
    return res
      .status(500)
      .json({ data: {}, message: "Cannot connect to database" });

  console.log("BODY", req.body); // TODO make dev-only
  console.log("");

  const { userDbId, routineDbId, operation } = JSON.parse(req.body);

  // Check operation is valid
  if (operation !== "add" && operation !== "remove")
    return res.status(500).json({ message: "Invalid operation!" });

  if (req.method == "POST") {
    // Fetch user
    const user = await db
      .collection("user-records")
      .findOne({ userDbId: new ObjectId(userDbId) });

    console.log("USER", user); // TODO make dev-only
    console.log("");

    // If user exists, update user object with routine Id
    if (user == null || user == undefined)
      return res.status(500).json({ message: "No user found!" });

    let userLikesArray: ObjectId[] = [];

    if (user.likes !== undefined) {
      userLikesArray = [...user.likes];
    }

    console.log("USER LIKES ARRAY OLD", userLikesArray);

    let newUserLikesArray: ObjectId[] = [];

    // Add or remove routine item and save as new array
    if (operation == "add") {
      userLikesArray.push(new ObjectId(routineDbId));
      newUserLikesArray = [...userLikesArray];
    } else if (operation == "remove") {
      newUserLikesArray = userLikesArray.filter((item) => item != routineDbId);
    }

    console.log("UPDATED LIKES", newUserLikesArray); // TODO make dev-only

    // Post user back to database
    const result = await db
      .collection("user-records")
      .updateOne(
        { userDbId: new ObjectId(userDbId) },
        { $set: { likes: newUserLikesArray } }
      );

    return res.status(200).json({ result });
  }

  res.status(500).json({ message: "No valid request method" });
}
