"use client";
import { useSession } from "next-auth/react";

export default function SaveButton() {
  const { data: session } = useSession();
  if (session?.user?.email)
    return (
      <div className="flex flex-row mt-3">
        <button className="btn m-auto" type="submit">
          Save Info
        </button>
      </div>
    );
}
