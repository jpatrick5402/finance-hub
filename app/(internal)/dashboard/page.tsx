"use client";
import { useContext } from "react";
import { ArcElement, Chart, Tooltip, Title } from "chart.js";

import UserContext from "@contexts/UserContext";

Chart.register(ArcElement, Tooltip, Title);

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);

  return <></>;
}
