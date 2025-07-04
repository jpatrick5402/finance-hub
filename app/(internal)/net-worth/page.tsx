"use client";
import UserContext from "@contexts/UserContext";
import { useContext } from "react";

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);
  
  return <div className="container">Net Worth</div>;
}
