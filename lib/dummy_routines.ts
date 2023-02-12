import { ObjectId } from "mongodb";
import { routinesType } from "../types/routine";

export const DUMMY_ROUTINES: routinesType[] = [
  {
    name: "Justin Timberlake",
    routine: [
      { timeStart: "8am", timeEnd: "9am", activity: "Wake up" },
      { timeStart: "9am", timeEnd: "10am", activity: "Read" },
      { timeStart: "10am", timeEnd: "11am", activity: "Sing in the shower" },
      { timeStart: "11am", timeEnd: "12pm", activity: "Phone my parents" },
      { timeStart: "12pm", timeEnd: "1pm", activity: "Network" },
      { timeStart: "1pm", timeEnd: "2pm", activity: "Dabble with new lyrics" },
      { timeStart: "2pm", timeEnd: "3pm", activity: "Lunch" },
      { timeStart: "3pm", timeEnd: "4pm", activity: "Meditate" },
      { timeStart: "4pm", timeEnd: "5pm", activity: "Jog" },
      { timeStart: "5pm", timeEnd: "6pm", activity: "Read" },
    ],
    likes: [
      {
        userDbId: new ObjectId("63d3c982469de49793fc66bf"),
        date: "1456677588",
      },
    ],
    datePosted: "1456677588",
  },
  {
    name: "Richard Gere",
    routine: [
      { timeStart: "8am", timeEnd: "9am", activity: "Wake up" },
      { timeStart: "9am", timeEnd: "10am", activity: "Read" },
      { timeStart: "10am", timeEnd: "11am", activity: "Sing in the shower" },
      { timeStart: "11am", timeEnd: "12pm", activity: "Phone my parents" },
      { timeStart: "12pm", timeEnd: "1pm", activity: "Network" },
      { timeStart: "1pm", timeEnd: "2pm", activity: "Dabble with new lyrics" },
      { timeStart: "2pm", timeEnd: "3pm", activity: "Lunch" },
      { timeStart: "3pm", timeEnd: "4pm", activity: "Meditate" },
      { timeStart: "4pm", timeEnd: "5pm", activity: "Jog" },
      { timeStart: "5pm", timeEnd: "6pm", activity: "Read" },
    ],
    likes: [
      {
        userDbId: new ObjectId("63d3c982469de49793fc66bf"),
        date: "1893368172",
      },
    ],
    datePosted: "1893368172",
  },
  {
    name: "Miley Cyrus",
    routine: [
      { timeStart: "8am", timeEnd: "9am", activity: "Wake up" },
      { timeStart: "9am", timeEnd: "10am", activity: "Read" },
      { timeStart: "10am", timeEnd: "11am", activity: "Sing in the shower" },
      { timeStart: "11am", timeEnd: "12pm", activity: "Phone my parents" },
      { timeStart: "12pm", timeEnd: "1pm", activity: "Network" },
      { timeStart: "1pm", timeEnd: "2pm", activity: "Dabble with new lyrics" },
      { timeStart: "2pm", timeEnd: "3pm", activity: "Lunch" },
      { timeStart: "3pm", timeEnd: "4pm", activity: "Meditate" },
      { timeStart: "4pm", timeEnd: "5pm", activity: "Jog" },
      { timeStart: "5pm", timeEnd: "6pm", activity: "Read" },
    ],
    likes: [
      {
        userDbId: new ObjectId("63d3c982469de49793fc66bf"),
        date: "1580381209",
      },
    ],
    datePosted: "1580381209",
  },
  {
    name: "Heugh Jackman",
    routine: [
      { timeStart: "8am", timeEnd: "9am", activity: "Wake up" },
      { timeStart: "9am", timeEnd: "10am", activity: "Read" },
      { timeStart: "10am", timeEnd: "11am", activity: "Sing in the shower" },
      { timeStart: "11am", timeEnd: "12pm", activity: "Phone my parents" },
      { timeStart: "12pm", timeEnd: "1pm", activity: "Network" },
      { timeStart: "1pm", timeEnd: "2pm", activity: "Dabble with new lyrics" },
      { timeStart: "2pm", timeEnd: "3pm", activity: "Lunch" },
      { timeStart: "3pm", timeEnd: "4pm", activity: "Meditate" },
      { timeStart: "4pm", timeEnd: "5pm", activity: "Jog" },
      { timeStart: "5pm", timeEnd: "6pm", activity: "Read" },
    ],
    likes: [],
    datePosted: "1761066051",
  },
  {
    name: "James Webb",
    routine: [
      { timeStart: "8am", timeEnd: "9am", activity: "Wake up" },
      { timeStart: "9am", timeEnd: "10am", activity: "Read" },
      { timeStart: "10am", timeEnd: "11am", activity: "Sing in the shower" },
      { timeStart: "11am", timeEnd: "12pm", activity: "Phone my parents" },
      { timeStart: "12pm", timeEnd: "1pm", activity: "Network" },
      { timeStart: "1pm", timeEnd: "2pm", activity: "Dabble with new lyrics" },
      { timeStart: "2pm", timeEnd: "3pm", activity: "Lunch" },
      { timeStart: "3pm", timeEnd: "4pm", activity: "Meditate" },
      { timeStart: "4pm", timeEnd: "5pm", activity: "Jog" },
      { timeStart: "5pm", timeEnd: "6pm", activity: "Read" },
    ],
    likes: [],
    datePosted: "1483479538",
  },
  {
    name: "Elon Musk",
    routine: [
      { timeStart: "8am", timeEnd: "9am", activity: "Wake up" },
      { timeStart: "9am", timeEnd: "10am", activity: "Read" },
      { timeStart: "10am", timeEnd: "11am", activity: "Sing in the shower" },
      { timeStart: "11am", timeEnd: "12pm", activity: "Phone my parents" },
      { timeStart: "12pm", timeEnd: "1pm", activity: "Network" },
      { timeStart: "1pm", timeEnd: "2pm", activity: "Dabble with new lyrics" },
      { timeStart: "2pm", timeEnd: "3pm", activity: "Lunch" },
      { timeStart: "3pm", timeEnd: "4pm", activity: "Meditate" },
      { timeStart: "4pm", timeEnd: "5pm", activity: "Jog" },
      { timeStart: "5pm", timeEnd: "6pm", activity: "Read" },
    ],
    likes: [
      {
        userDbId: new ObjectId("63d3c982469de49793fc66bf"),
        date: "1300612338",
      },
    ],
    datePosted: "1300612338",
  },
];
