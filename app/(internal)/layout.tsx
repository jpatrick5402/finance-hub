"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Loading from "@app/loading";
import { getData } from "@lib/data";
import User from "@models/User";
import UserContext from "@contexts/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(new User("", "", 0, [], [], []));

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.email) {
        const resUser = await getData(session?.user?.email);
        setUserData(resUser);
      }
    }
    fetchUser();
  }, [session?.user]);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      <Suspense fallback={<Loading />}>
        <div className="grow-1">{children}</div>
      </Suspense>
    </UserContext.Provider>
  );
}
