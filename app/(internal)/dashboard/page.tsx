"use client";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Title } from "chart.js";

import { setData } from "@lib/data";
import UserContext from "@contexts/UserContext";
import SaveButton from "@components/SaveButton";

Chart.register(ArcElement, Tooltip, Title);

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
      className="flex flex-col items-center"
      id="dashboardForm"
    >
      <div className="container text-xl flex flex-col lg:flex-row">
        {/* Email */}
        <p className="m-auto text-center">{user.email}</p>
        {/* Name */}
        <div className="m-auto text-center">
          <label>Name:</label>
          <input
            type="text"
            className="m-auto text-center"
            value={user.full_name}
            onChange={(e) => {
              setUser((prev) => ({
                ...prev,
                full_name: e.target.value,
              }));
            }}
          />
        </div>
        {/* Salary */}
        <div className="m-auto text-center">
          <label>Annual Income:</label>
          <input
            title="Salary"
            type="text"
            className="m-auto text-center"
            value={user.salary}
            onChange={(e) => {
              let val: any = e.target.value;
              // Allow empty string for controlled input, otherwise parse as float
              if (val === "") {
                setUser((prev: any) => ({
                  ...prev,
                  salary: val,
                }));
                return;
              }
              // Only allow valid decimal numbers
              if (!/^\d*\.?\d*$/.test(val)) {
                return;
              }
              val = parseFloat(val);
              if (isNaN(val)) val = "";

              setUser((prev: any) => ({
                ...prev,
                salary: val,
              }));
            }}
          />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
