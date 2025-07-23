"use client";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import { ArcElement, Chart, Tooltip } from "chart.js";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { reductionParse } from "@lib/reductionParse";

Chart.register(ArcElement, Tooltip);

export default function Budget() {
  const [user, setUser] = useContext(UserContext);

  // --- chart data ---
  const totalExpenses = user.expenses.reduce(
    (total: number, item: any) => reductionParse(total, item),
    0
  );
  const monthlyIncome = Number(user.salary) / 12;
  const remaining = Math.floor(monthlyIncome - totalExpenses);
  // Filter only active expenses
  const activeExpenses = user.expenses.filter((expense: any) => expense.active);

  const budgetGraphData = {
    labels: ["Remaining", ...activeExpenses.map((expense) => expense.name)],
    datasets: [
      {
        label: "Value $",
        data: [
          remaining > 0 ? remaining : 0,
          ...activeExpenses.map((expense) => expense.value),
          activeExpenses.length == 0 && 1,
        ],
        backgroundColor: [
          "rgba(100, 255, 100, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
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
            <label className="mt-auto mb-auto">Annual Income:</label>
            <input
              className="pl-2"
              type="text"
              step="any"
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
          <List
            attributeList={user.expenses}
            columnList={["name", "value", "category"]}
          />
          <p>
            Remaining: $
            {(
              Number(user.salary) / 12 -
              user.expenses.reduce(
                (total: number, item: any) => reductionParse(total, item),
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
