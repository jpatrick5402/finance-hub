"use client";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import { ArcElement, Chart, Tooltip } from "chart.js";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

export default function Budget() {
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
      <div className="container flex flex-col sm:flex-row">
        <div className="m-auto">
          <div className="m-auto mb-4">
            <label className="mt-auto mb-auto">Salary:</label>
            <input
              className="text-center"
              type="text"
              value={user.salary}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  salary: Number(e.target.value),
                }));
              }}
            />
          </div>
          <p className="text-xl">
            Monthly Budget: $
            {(Number(user.salary) / 12).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            /month
          </p>
          <p>
            Monthly Expenses: $
            {totalExpenses.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <List attribute={user.expenses} />
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
          <Doughnut data={budgetGraphData} className="flex m-auto w-50%" />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
