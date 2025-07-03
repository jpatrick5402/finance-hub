"use client";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Title } from "chart.js";

import { setData } from "@lib/data";
import UserContext from "@contexts/UserContext";

Chart.register(ArcElement, Tooltip, Title);

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);

  const budgetData = {
    labels: user.expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Cost $",
        data: user.expenses.map((expense) => expense.value),
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
      action={async (input: FormData) => {
        await setData(user);
        location.reload();
      }}
      className="flex flex-col items-center"
      id="dashboardForm"
    >
      <button
        className="btn"
        type="button"
        onClick={() => {
          console.log(user);
        }}
      >
        Check User
      </button>
      <div className="container text-xl">
        <p>Email: {user.email}</p>
        <p>
          Name:{" "}
          <input
            defaultValue={user.full_name}
            name="name"
            onChange={(e) => {
              setUser((prev) => ({
                ...prev,
                full_name: e.target.value,
              }));
            }}
          />
        </p>
        <p>
          Salary: $
          <input
            type="text"
            name="salary"
            value={user.salary.toLocaleString()}
            onChange={(e) => {
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
            }}
          />
          /year
        </p>
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
              <li key={expense.name + expense.value} className="">
                <input
                  type="text"
                  name="expenses"
                  defaultValue={expense.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.map((exp, i) =>
                        i === index ? { ...exp, name: newName } : exp
                      ),
                    }));
                  }}
                />
                $
                <input
                  type="text"
                  name="expensesVal"
                  defaultValue={expense.value.toLocaleString()}
                  onChange={(e) => {
                    const newValue = Number(
                      e.target.value.replace(/,/g, "") || 0
                    );
                    if (Number.isInteger(newValue))
                      setUser((prev) => ({
                        ...prev,
                        expenses: prev.expenses.map((exp, i) =>
                          i === index ? { ...exp, value: newValue } : exp
                        ),
                      }));
                    else {
                      // TODO: show dummy lights
                      console.log("Nope");
                    }
                  }}
                />
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
          <button
            className="bg-(--color-green) p-2 m-2 rounded "
            type="button"
            onClick={(e) => {
              if (
                !user.expenses.some((exp) => exp.name === "" && exp.value === 0)
              ) {
                setUser((prev) => ({
                  ...prev,
                  expenses: [...prev.expenses, { name: "", value: 0 }],
                }));
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
            data={budgetData}
            options={{
              plugins: {
                title: {
                  color: "#000000",
                  text: "Expenses",
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
              <li key={asset.name + asset.value + asset.APY}>
                <input
                  type="text"
                  name="assets"
                  defaultValue={asset.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.map((asset, i) =>
                        i === index ? { ...asset, name: newName } : asset
                      ),
                    }));
                  }}
                />
                $
                <input
                  type="text"
                  name="assetsVal"
                  defaultValue={asset.value}
                  onChange={(e) => {
                    const newValue = Number(
                      e.target.value.replace(/,/g, "") || 0
                    );
                    if (Number.isInteger(newValue))
                      setUser((prev) => ({
                        ...prev,
                        assets: prev.assets.map((asset, i) =>
                          i === index ? { ...asset, value: newValue } : asset
                        ),
                      }));
                    else {
                      // TODO: show dummy lights
                      console.log("Nope");
                    }
                  }}
                />
                APY:
                <input
                  type="text"
                  name="assetsAPY"
                  defaultValue={asset.APY}
                  onChange={(e) => {
                    const newValue = Number(
                      e.target.value.replace(/,/g, "") || 0
                    );
                    if (Number.isInteger(newValue))
                      setUser((prev) => ({
                        ...prev,
                        assets: prev.assets.map((asset, i) =>
                          i === index ? { ...asset, APY: newValue } : asset
                        ),
                      }));
                    else {
                      // TODO: show dummy lights
                      console.log("Nope");
                    }
                  }}
                />
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
          <button
            className="bg-(--color-green) p-2 m-2 rounded "
            type="button"
            onClick={() => {
              if (
                !user.assets.some(
                  (asset) =>
                    asset.name === "" && asset.value === 0 && asset.APY === 0
                )
              ) {
                setUser((prev) => ({
                  ...prev,
                  assets: [...prev.assets, { name: "", value: 0, APY: 0 }],
                }));
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
              <li key={debt.name + debt.value + debt.APR}>
                <input
                  type="text"
                  name="debts"
                  defaultValue={debt.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.map((debt, i) =>
                        i === index ? { ...debt, name: newName } : debt
                      ),
                    }));
                  }}
                />
                $
                <input
                  type="text"
                  name="debtsVal"
                  defaultValue={debt.value}
                  onChange={(e) => {
                    const newValue = Number(
                      e.target.value.replace(/,/g, "") || 0
                    );
                    if (Number.isInteger(newValue))
                      setUser((prev) => ({
                        ...prev,
                        debts: prev.debts.map((debt, i) =>
                          i === index ? { ...debt, value: newValue } : debt
                        ),
                      }));
                    else {
                      // TODO: show dummy lights
                      console.log("Nope");
                    }
                  }}
                />
                APR:
                <input
                  type="text"
                  name="debtsAPR"
                  defaultValue={debt.APR}
                  onChange={(e) => {
                    const newValue = Number(
                      e.target.value.replace(/,/g, "") || 0
                    );
                    if (Number.isInteger(newValue))
                      setUser((prev) => ({
                        ...prev,
                        debts: prev.debts.map((debt, i) =>
                          i === index ? { ...debt, APR: newValue } : debt
                        ),
                      }));
                    else {
                      // TODO: show dummy lights
                      console.log("Nope");
                    }
                  }}
                />
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
          <button
            className="bg-(--color-green) p-2 m-2 rounded "
            type="button"
            onClick={() => {
              if (
                !user.debts.some(
                  (debt) =>
                    debt.name === "" && debt.value === 0 && debt.APR === 0
                )
              ) {
                setUser((prev) => ({
                  ...prev,
                  debts: [...prev.debts, { name: "", value: 0, APR: 0 }],
                }));
              }
            }}
          >
            Add Debt
          </button>
        </div>
      </div>
      {user.email ? (
        <button className="btn" type="submit">
          Save Info
        </button>
      ) : null}
    </Form>
  );
}
