"use client";
import UserContext from "@contexts/UserContext";
import { useContext } from "react";
import List from "@components/List";
import Form from "next/form";
import { setData } from "@lib/data";
import SaveButton from "@components/SaveButton";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

export default function Debts() {
  const [user, setUser] = useContext(UserContext);

  // -- chart data --
  const debtData = {
    labels: [...user.debts.map((debt) => debt.name)],
    datasets: [
      {
        label: "-$",
        data: [...user.debts.map((debt) => debt.value)],
        backgroundColor: [
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 125, 129, 0.2)",
          "rgba(255, 0, 0, 0.2)",
          "rgba(139, 0, 0, 0.2)",
          "rgba(128, 0, 0, 0.2)",
          "rgba(255, 99, 71, 0.2)",
          "rgba(220, 20, 60, 0.2)",
          "rgba(178, 34, 34, 0.2)",
          "rgba(255, 69, 0, 0.2)",
        ],
      },
    ],
  };

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="flex container">
        <p className="text-2xl m-auto">
          Total Debts: -$
          {user.debts
            .reduce((total: number, debt: any) => total + debt.value, 0)
            .toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </p>
      </div>
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut data={debtData} />
        </div>
        <div className="m-auto">
          <List
            attributeList={user.debts}
            columnList={["name", "value", "interest", "category"]}
          />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
