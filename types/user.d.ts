import { ObjectId } from "mongodb";

// TODO: fix the id and favourites fields below to not have ambiquity between string or objectId
export interface UserLikesType {
  routineDbId: ObjectId | string; // string or objectId
  date: string; // timestamp
}

export interface UserRecordType {
  _id: ObjectId | string;
  userDbId: ObjectId | string;
  likes: UserLikesType[];
}
