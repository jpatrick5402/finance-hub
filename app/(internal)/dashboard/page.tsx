"use client";
import Form from "next/form";
import { useContext } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Title } from "chart.js";

import { setData } from "@lib/data";
import UserContext from "@contexts/UserContext";
import { useRef } from "react";

Chart.register(ArcElement, Tooltip, Title);

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value.replace(/,/g, "") || 0);
    if (Number.isInteger(newValue))
      setUser((prev) => ({
        ...prev,
        salary: newValue,
      }));
    else {
      // TODO: show dummy lights
      console.log("Nope");
    }
  };

  // --- chart data ---
  const totalExpenses = user.expenses.reduce(
    (total: number, expense: any) => total + expense.value,
    0
  );
  const monthlyIncome = Number(user.salary) / 12;
  const remaining = monthlyIncome - totalExpenses;

  const budgetGraphData = {
    labels: [...user.expenses.map((expense) => expense.name), "Remaining"],
    datasets: [
      {
        label: "Cost $",
        data: [
          ...user.expenses.map((expense) => expense.value),
          remaining > 0 ? remaining : 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(100, 255, 100, 0.2)", // color for "Remaining"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(100, 255, 100, 1)", // border for "Remaining"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Form
      action={async (input: FormData) => {
        await setData(user);
        location.reload();
      }}
      className="flex flex-col items-center"
      id="dashboardForm"
    >
      <div className="container text-xl flex flex-col sm:flex-row">
        <label className="m-auto">Email: {user.email}</label>
        <label className="m-auto">
          Salary: $
          <input
            type="text"
            name="salary"
            value={user.salary.toLocaleString()}
            onChange={handleSalaryChange}
          />
        </label>
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
          <ul className="pl-5 list-disc" id="expenseList">
            {user.expenses.map((expense, index) => (
              <li key={expense.name + expense.value} className="flex gap-5 m-2">
                <p className="w-40">{expense.name}</p>
                <p className="w-30">${expense.value.toLocaleString()}</p>
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.filter(
                        (cur) =>
                          cur.name + cur.value !== expense.name + expense.value
                      ),
                    }));
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <input type="text" id="newExpenseName" placeholder="Name" />
          <input type="text" id="newExpenseVal" placeholder="Value" />
          <button
            className="bg-(--color-green) p-2 m-2 rounded"
            type="button"
            onClick={async (e) => {
              const nameInput = document.getElementById(
                "newExpenseName"
              ) as HTMLInputElement | null;
              const valInput = document.getElementById(
                "newExpenseVal"
              ) as HTMLInputElement | null;
              if (
                nameInput?.value &&
                valInput?.value &&
                !user.expenses.some(
                  (expense) =>
                    expense.name === nameInput.value &&
                    expense.value ===
                      Number(valInput.value.replace(/,/g, "") || 0)
                )
              ) {
                await setUser((prev) => ({
                  ...prev,
                  expenses: [
                    ...prev.expenses,
                    {
                      name: nameInput.value,
                      value: Number(valInput.value.replace(/,/g, "") || 0),
                    },
                  ],
                }));
                nameInput.value = "";
                valInput.value = "";
              }
            }}
          >
            Add Expense
          </button>
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
          <ul className="pl-5 list-disc" id="assetsList">
            {user.assets.map((asset, index) => (
              <li
                key={asset.name + asset.value + asset.APY}
                className="flex gap-5 m-2"
              >
                <p className="w-40">{asset.name}</p>
                <p className="w-30">${asset.value}</p>
                <p className="w-20">APY:{asset.APY}</p>
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.filter(
                        (cur) =>
                          cur.name + cur.value + cur.APY !==
                          asset.name + asset.value + asset.APY
                      ),
                    }));
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <input type="text" id="newAssetName" placeholder="Name" />
          <input type="text" id="newAssetVal" placeholder="Value" />
          <input type="text" id="newAssetAPY" placeholder="APY" />
          <button
            className="bg-(--color-green) p-2 m-2 rounded"
            type="button"
            onClick={async (e) => {
              const nameInput = document.getElementById(
                "newAssetName"
              ) as HTMLInputElement | null;
              const valInput = document.getElementById(
                "newAssetVal"
              ) as HTMLInputElement | null;
              const APYInput = document.getElementById(
                "newAssetAPY"
              ) as HTMLInputElement | null;
              if (
                nameInput?.value &&
                valInput?.value &&
                APYInput?.value &&
                !user.assets.some(
                  (asset) =>
                    (asset.name === nameInput.value &&
                      asset.value ===
                        Number(valInput.value.replace(/,/g, "") || 0) &&
                      asset.APY ===
                        Number(APYInput.value.replace(/[,]/g, ""))) ||
                    0
                )
              ) {
                await setUser((prev) => ({
                  ...prev,
                  assets: [
                    ...prev.assets,
                    {
                      name: nameInput.value,
                      value: Number(valInput.value.replace(/,/g, "") || 0),
                      APY: Number(APYInput.value.replace(/[,]/g, "") || 0),
                    },
                  ],
                }));
                nameInput.value = "";
                valInput.value = "";
                APYInput.value = "";
              }
            }}
          >
            Add Asset
          </button>
        </div>
        <div className="container">
          <p className="text-xl">Debts</p>
          <ul className="pl-5 list-disc" id="debtsList">
            {user.debts.map((debt, index) => (
              <li
                key={debt.name + debt.value + debt.APR}
                className="flex gap-5 m-2"
              >
                <p className="w-40">{debt.name}</p>
                <p className="w-30">${debt.value}</p>
                <p className="w-20">APR:{debt.APR}</p>
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.filter(
                        (cur) =>
                          cur.name + cur.value + cur.APR !==
                          debt.name + debt.value + debt.APR
                      ),
                    }));
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <input type="text" id="newDebtName" placeholder="Name" />
          <input type="text" id="newDebtVal" placeholder="Value" />
          <input type="text" id="newDebtAPR" placeholder="APR" />
          <button
            className="bg-(--color-green) p-2 m-2 rounded"
            type="button"
            onClick={async (e) => {
              const nameInput = document.getElementById(
                "newDebtName"
              ) as HTMLInputElement | null;
              const valInput = document.getElementById(
                "newDebtVal"
              ) as HTMLInputElement | null;
              const APRInput = document.getElementById(
                "newDebtAPR"
              ) as HTMLInputElement | null;
              if (
                nameInput?.value &&
                valInput?.value &&
                APRInput?.value &&
                !user.debts.some(
                  (debt) =>
                    (debt.name === nameInput.value &&
                      debt.value ===
                        Number(valInput.value.replace(/,/g, "") || 0) &&
                      debt.APR ===
                        Number(APRInput.value.replace(/[,]/g, ""))) ||
                    0
                )
              ) {
                await setUser((prev) => ({
                  ...prev,
                  debts: [
                    ...prev.debts,
                    {
                      name: nameInput.value,
                      value: Number(valInput.value.replace(/,/g, "") || 0),
                      APR: Number(APRInput.value.replace(/[,]/g, "") || 0),
                    },
                  ],
                }));
                nameInput.value = "";
                valInput.value = "";
                APRInput.value = "";
              }
            }}
          >
            Add Debt
          </button>
        </div>
      </div>
      <div>
        <button
          className="btn"
          type="button"
          onClick={() => {
            console.log(user);
          }}
        >
          Check User
        </button>
        {user.email ? (
          <button className="btn" type="submit">
            Save Info
          </button>
        ) : null}
      </div>
    </Form>
  );
}
