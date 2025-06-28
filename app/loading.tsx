"use client";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate 2-second loading time
  }, []);

  return (
    <>
      {loading ? (
        <ClipLoader color="#36D7B7" loading={loading} size={50} />
      ) : (
        <p>Content loaded!</p>
      )}
    </>
  );
}
