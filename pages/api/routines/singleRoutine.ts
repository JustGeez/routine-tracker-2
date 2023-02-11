// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("routine");

  switch (req.method) {
    case "GET":
      const allRoutines = await db.collection("routines").find({}).toArray();
      res.status(200).json({ data: allRoutines });
      break;

    case "POST":
      const bodyObject = req.body;
      const routine = await db.collection("routines").insertOne(bodyObject);
      res.status(200).json(routine.insertedId);
      break;

    case "PUT":
      const { userDbId, routineDbId, operation } = JSON.parse(req.body);

      if (userDbId == undefined)
        return res
          .status(500)
          .json({ message: "No userDbId field defined in body" });
      if (routineDbId == undefined)
        return res
          .status(500)
          .json({ message: "No routineDbId field defined in body" });
      if (operation == undefined)
        return res
          .status(500)
          .json({ message: "No operation field defined in body" });

      let result;

      if (operation == "add") {
        result = await db
          .collection("routines")
          .updateOne(
            { _id: new ObjectId(routineDbId) },
            { $addToSet: { likes: new ObjectId(userDbId) } }
          );
      } else if (operation == "remove") {
        result = await db
          .collection("routines")
          .updateOne(
            { _id: new ObjectId(routineDbId) },
            { $pull: { likes: new ObjectId(userDbId) } }
          );
      }

      console.log(result);
      res.status(200).json({ result });
      break;

    default:
      res.status(200).json({ message: "No valid request method received" });
  }
}
