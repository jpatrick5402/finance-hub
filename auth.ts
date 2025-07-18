import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Apple from "next-auth/providers/apple";
import Resend from "next-auth/providers/resend";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: NeonAdapter(
    new Pool({ connectionString: process.env.DATABASE_URL })
  ),
  providers: [
    Resend,
    GitHub({
      // https://github.com/settings/developers
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Google({
      // https://console.cloud.google.com/auth/clients
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    Apple({
      //
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
