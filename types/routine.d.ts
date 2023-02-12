import { ObjectId } from "mongodb";

export interface activityListType {
  timeStart: string;
  timeEnd: string;
  activity: string;
}

// TODO: fix the id and favourites fields below to not have ambiquity between string or objectId
export interface routineLikesType {
  userDbId: ObjectId | string; // string or objectId
  date: string; // timestamp
}

// TODO: fix the id and favourites fields below to not have ambiquity between string or objectId
export interface routinesType {
  _id?: ObjectId | string;
  name: string;
  routine: activityListType[];
  likes: routineLikesType[];
  datePosted: string; // timestamp
}
