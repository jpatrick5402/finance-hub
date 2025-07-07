"use client";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Title } from "chart.js";

import { setData } from "@lib/data";
import UserContext from "@contexts/UserContext";
import SaveButton from "@components/SaveButton";
import UserList from "@components/List";

Chart.register(ArcElement, Tooltip, Title);

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);

  // --- chart data ---
  const totalExpenses = user.expenses.reduce(
    (total: number, expense: any) => total + expense.value,
    0
  );
  const monthlyIncome = Number(user.salary) / 12;
  const remaining = Math.floor(monthlyIncome - totalExpenses);
  const budgetGraphData = {
    labels: ["Remaining", ...user.expenses.map((expense) => expense.name)],
    datasets: [
      {
        label: "Value $",
        data: [
          remaining > 0 ? remaining : 0,
          ...user.expenses.map((expense) => expense.value),
        ],
        backgroundColor: [
          "rgba(100, 255, 100, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(100, 255, 100, 1)",
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
      className="flex flex-col items-center"
      id="dashboardForm"
    >
      <div className="container text-xl flex flex-col sm:flex-row">
        {/* Name */}
        <input
          type="text"
          className="m-auto"
          value={user.full_name}
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              full_name: e.target.value,
            }));
          }}
        />
        {/* Email */}
        <p className="m-auto">{user.email}</p>
        {/* Salary */}
        <input
          type="text"
          className="m-auto"
          value={user.salary}
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              salary: Number(e.target.value),
            }));
          }}
        />
      </div>
      <div className="container flex flex-col sm:flex-row">
        <div className="m-0">
          <p className="text-xl">
            Monthly Budget: $
            {(Number(user.salary) / 12).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            /month
          </p>
          <p>Monthly Expenses:</p>
          {/* Expenses */}
          <UserList attribute={user.expenses} />
          <p>
            Remaining: $
            {(
              Number(user.salary) / 12 -
              user.expenses.reduce(
                (total: number, expense: any) => total + expense.value,
                0
              )
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="flex m-auto">
          <Doughnut
            data={budgetGraphData}
            options={{
              plugins: {
                title: {
                  color: "#000000",
                  text: "Budget",
                  display: true,
                  font: { weight: "normal" },
                },
              },
            }}
            className="flex m-auto w-50%"
          />
        </div>
      </div>
      <div className="container text-xl">
        Net Worth: $
        {(
          user.assets.reduce(
            (total: number, asset: any) => total + asset.value,
            0
          ) -
          user.debts.reduce((total: number, debt: any) => total + debt.value, 0)
        ).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="flex flex-col columns-1 gap-0 sm:gap-3 sm:flex-row sm:columns-2 w-full">
        <div className="container">
          <p className="text-xl">Assets</p>
          {/* Assets */}
          <UserList attribute={user.assets} />
        </div>
        <div className="container">
          <p className="text-xl">Debts</p>
          {/* Debts */}
          <UserList attribute={user.debts} />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
