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

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);

  // -- chart data --
  const debtData = {
    labels: [...user.debts.map((debt) => debt.name)],
    datasets: [
      {
        label: "Value $",
        data: [...user.debts.map((debt) => debt.value)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
          Total Debts:{" $"}
          {user.debts.reduce(
            (total: number, debt: any) => total + debt.value,
            0
          )}
        </p>
      </div>
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut data={debtData} />
        </div>
        <div className="m-auto">
          <List attribute={user.debts} />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
