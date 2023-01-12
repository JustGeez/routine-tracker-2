export interface activityListType {
  timeStart: string;
  timeEnd: string;
  activity: string;
}

export interface routinesType {
  name: string;
  routine: activityListType[];
}
