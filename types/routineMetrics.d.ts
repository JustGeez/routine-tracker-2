import { ObjectId } from "mongodb";

export interface RoutineLikeMetricsType {
  routineDbId: ObjectId | string;
  numLikesInPeriod: number;
}
