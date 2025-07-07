"use client";
import UserContext from "@contexts/UserContext";
import { useContext } from "react";
import List from "@components/List";
import Form from "next/form";
import { setData } from "@lib/data";
import SaveButton from "@components/SaveButton";

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);
  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="container">
        Total Debts:{" $"}
        {user.debts.reduce((total: number, debt: any) => total + debt.value, 0)}
      </div>
      <div className="container">
        <List attribute={user.debts} />
      </div>
      <SaveButton />
    </Form>
  );
}
