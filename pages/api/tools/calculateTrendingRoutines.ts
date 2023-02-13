import { OptionalId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/dbActions";
import { RoutineLikesType } from "../../../types/routine";
import { RoutineLikeMetricsType } from "../../../types/routineMetrics";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.TRENDING_PERIOD_DAYS == undefined)
    return res.status(500).json({
      data: {},
      message: "ERROR: Trending period environment variable is undefined!",
    });

  if (process.env.TRENDING_ROUTINES_COUNT == undefined)
    return res.status(500).json({
      data: {},
      message:
        "ERROR: Trending routines count environment variable is undefined!",
    });

  const db = await connectToDatabase();

  if (db == null)
    return res
      .status(500)
      .json({ data: {}, message: "Cannot connect to database" });

  if (req.method == "GET") {
    // Get all routines from routine database
    const allRoutines = await db.collection("routines").find({}).toArray();

    // Set current date and date used to measure against
    const currentDateTimestamp = Date.now(); // number
    const startMeasureDateTimestamp =
      currentDateTimestamp -
      Number(process.env.TRENDING_PERIOD_DAYS) * 24 * 60 * 60 * 1000;

    // TODO: Check only subset of routines that are active ie. don't waste time on old, inactive routines
    // Run through all routines and check number of likes in last trending period
    const routinesLikedMetrics: RoutineLikeMetricsType[] = [];

    allRoutines.map((routineItem) => {
      const likesInPeriod: RoutineLikesType[] = routineItem.likes.filter(
        (likeItem: RoutineLikesType) =>
          Number(likeItem.date) >= startMeasureDateTimestamp
      );

      console.log(
        `${routineItem.name} :: `,
        `Number of like in period ${likesInPeriod.length}`
      );

      const tempRoutineObject = {
        routineDbId: routineItem._id,
        numLikesInPeriod: likesInPeriod.length,
      };

      // Add checked routines to checked routine array [{routineId: string, numLikesInPeriod: number}]
      routinesLikedMetrics.push(tempRoutineObject);
    });

    console.log("UNSORTED METRICS", routinesLikedMetrics);

    // Sort checked routines array in descending order by number of likes
    routinesLikedMetrics.sort(
      (a, b) => b.numLikesInPeriod - a.numLikesInPeriod
    );

    console.log("SORTED METRICS", routinesLikedMetrics);

    // Clear existing trending database
    await db.collection("trending-routines").deleteMany({});

    // Insert new trending database with top X routines from checked routines array
    const reducedSortedTrendingRoutinesMetrics = routinesLikedMetrics.slice(
      0,
      Number(process.env.TRENDING_ROUTINES_COUNT)
    );

    const sortedTrendingRoutines = reducedSortedTrendingRoutinesMetrics.map(
      (metricItem) =>
        allRoutines.find(
          (routineItem) => routineItem._id == metricItem.routineDbId
        )
    );

    console.log("SORTED ROUTINES", sortedTrendingRoutines);

    if (sortedTrendingRoutines == undefined) return;

    const ss = sortedTrendingRoutines as OptionalId<Document>[];

    const insertedIds = await db.collection("trending-routines").insertMany(ss);

    console.log(insertedIds);

    return res.status(200).json({});
  }

  return res
    .status(200)
    .json({ data: {}, message: "ERROR: No valid request method used" });
}
