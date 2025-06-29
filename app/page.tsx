import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Home() {
  // if user is logged in, redirect to /dashboard
  let session = await auth();
  return <></>;
}
