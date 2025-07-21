"use server";
import { signIn, signOut } from "@/auth";

export async function login(
  provider: string,
  redirectURL: string,
  email?: string
) {
  await signIn(provider, { email, redirectTo: redirectURL });
}

export async function logout(redirectURL: string) {
  await signOut({ redirectTo: redirectURL });
}
