import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({ // https://console.cloud.google.com/auth/clients
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub(), // https://github.com/settings/developers
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@finance-hub.dev",
    }),
  ],
  session: {
    strategy: "database",
  },
  trustHost: true,
});
