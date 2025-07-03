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

  // --- onChange handlers ---
  type FieldType = "expenses" | "assets" | "debts";
  type FieldKey = "name" | "value" | "APY" | "APR";

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSetUserRef = useRef<{
    [key: string]: ReturnType<typeof debounce>;
  }>({});

  const handleArrayFieldChange =
    (type: FieldType, key: FieldKey, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: string | number = e.target.value;
      if (key === "value" || key === "APY" || key === "APR") {
        newValue = Number(newValue.replace(/,/g, "") || 0);
        if (!Number.isInteger(newValue)) {
          // TODO: show dummy lights
          console.log("Nope");
          return;
        }
      }
      const debounceKey = `${type}-${key}-${index}`;
      if (!debouncedSetUserRef.current[debounceKey]) {
        debouncedSetUserRef.current[debounceKey] = debounce(
          (value: string | number) => {
            setUser((prev) => ({
              ...prev,
              [type]: prev[type].map((item: any, i: number) =>
                i === index ? { ...item, [key]: value } : item
              ),
            }));
          },
          400
        );
      }
      debouncedSetUserRef.current[debounceKey](newValue);
    };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      full_name: e.target.value,
    }));
  };

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
      <div>
        <button
          className="btn"
          type="button"
          onClick={() => {
            console.log(user, budgetGraphData);
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
      <div className="container text-xl flex flex-col sm:flex-row">
        <label className="m-auto">Email: {user.email}</label>
        <label className="m-auto">
          Name:{" "}
          <input
            defaultValue={user.full_name}
            name="name"
            onChange={handleNameChange}
          />
        </label>
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
              <li key={expense.name + expense.value} className="">
                <input
                  type="text"
                  name="expenses"
                  defaultValue={expense.name}
                  onChange={handleArrayFieldChange("expenses", "name", index)}
                />
                $
                <input
                  type="text"
                  name="expensesVal"
                  defaultValue={expense.value.toLocaleString()}
                  onChange={handleArrayFieldChange("expenses", "value", index)}
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
              <li key={asset.name + asset.value + asset.APY}>
                <input
                  type="text"
                  name="assets"
                  defaultValue={asset.name}
                  onChange={handleArrayFieldChange("assets", "name", index)}
                />
                $
                <input
                  type="text"
                  name="assetsVal"
                  defaultValue={asset.value}
                  onChange={handleArrayFieldChange("assets", "value", index)}
                />
                APY:
                <input
                  type="text"
                  name="assetsAPY"
                  defaultValue={asset.APY}
                  onChange={handleArrayFieldChange("assets", "APY", index)}
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
                  onChange={handleArrayFieldChange("debts", "name", index)}
                />
                $
                <input
                  type="text"
                  name="debtsVal"
                  defaultValue={debt.value}
                  onChange={handleArrayFieldChange("debts", "value", index)}
                />
                APR:
                <input
                  type="text"
                  name="debtsAPR"
                  defaultValue={debt.APR}
                  onChange={handleArrayFieldChange("debts", "APR", index)}
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
    </Form>
  );
}
