import React, { ReactNode, Suspense } from "react";
import { neon } from "@neondatabase/serverless";

import Loading from "@app/loading";
import Header from "@app/components/AppHeader";
import User from "@models/User";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let id = "1";

  if (!id) return new User("", "", "", 0, [], [], []);

  const sql = neon(`${process.env.DATABASE_URL}`);
  const res = await sql`SELECT * FROM Users WHERE id=(${id})`;
  const userData = res[0];

  const user =
    !res[0] || !userData
      ? new User("", "", "", 0, [], [], [])
      : new User(
          userData["id"],
          userData["email"],
          userData["full_name"],
          userData["salary"],
          userData["assets"],
          userData["debts"],
          userData["expenses"]
        );

  interface ChildrenProps {
    children?: ReactNode;
  }

  let childrenWithParams = React.Children.map(children, (child) => {
    return React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, { user: user })
      : child;
  });
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="grow-1">{children}</div>
      </Suspense>
    </>
  );
}
