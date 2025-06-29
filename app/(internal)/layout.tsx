import React, { Suspense } from "react";

import Loading from "@app/loading";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="grow-1">{children}</div>
      </Suspense>
    </>
  );
}
