import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID || "",
    //   clientSecret: process.env.APPLE_SECRET || "",
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID || "",
    //   clientSecret: process.env.FACEBOOK_SECRET || "",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "Routine Tracker 2000 <no-reply@example.com>",
    // }),
  ],
});
