// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { routineLikesType } from "../../../types/routine";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("routine");

  switch (req.method) {
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

      const newLikeObject: routineLikesType = {
        userDbId: new ObjectId(userDbId),
        date: String(Date.now()),
      };

      let result;

      if (operation == "add") {
        result = await db.collection("routines").updateOne(
          { _id: new ObjectId(routineDbId) },
          {
            $addToSet: {
              likes: newLikeObject,
            },
          }
        );
      } else if (operation == "remove") {
        result = await db
          .collection("routines")
          .updateOne(
            { _id: new ObjectId(routineDbId) },
            { $pull: { likes: newLikeObject } }
          );
      }

      console.log(result);
      res.status(200).json({ result });
      break;

    default:
      res.status(200).json({ message: "No valid request method received" });
  }
}
