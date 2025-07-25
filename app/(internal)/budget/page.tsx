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
import { getBudgetChartInfo } from "@lib/chartData";

Chart.register(ArcElement, Tooltip);

export default function Budget() {
  const [user, setUser] = useContext(UserContext);

  const totalExpenses = user.expenses.reduce(
    (total: number, item: any) => reductionParse(total, item),
    0
  );

  const budgetGraphData: any = getBudgetChartInfo(user);

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="container">
        <label>Annual Income Sources:</label>
        <List attributeList={user.income} columnList={["name", "value"]} />
      </div>
      <div className="container flex flex-col sm:flex-row">
        <div className="flex m-auto">
          <Doughnut data={budgetGraphData} className="flex m-auto w-50%" />
        </div>
        <div className="m-auto flex flex-col">
          <p className="text-xl m-auto">
            Monthly Budget: $
            {(
              Number(
                user.income.reduce(
                  (total: number, item: any) => reductionParse(total, item),
                  0
                )
              ) / 12
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            /month
          </p>
          <p className="m-auto">
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
          <p className="m-auto">
            Remaining: $
            {(
              Number(
                user.income.reduce(
                  (total: number, item: any) => reductionParse(total, item),
                  0
                )
              ) /
                12 -
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
      </div>
      <SaveButton />
    </Form>
  );
}
