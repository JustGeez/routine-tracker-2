import { ObjectId } from "mongodb";

export interface ActivityListType {
  timeStart: string;
  timeEnd: string;
  activity: string;
}

// TODO: fix the id and favourites fields below to not have ambiquity between string or objectId
export interface RoutineLikesType {
  userDbId: ObjectId | string; // string or objectId
  date: string; // timestamp
}

// TODO: fix the id and favourites fields below to not have ambiquity between string or objectId
export interface RoutinesType {
  _id?: ObjectId | string;
  name: string;
  author: string;
  userDbId: ObjectId | string;
  category: string;
  routine: ActivityListType[];
  likes: RoutineLikesType[];
  datePosted: string; // timestamp
}
