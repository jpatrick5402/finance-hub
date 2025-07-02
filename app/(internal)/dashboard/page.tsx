"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import User from "@models/User";
import { setData } from "@lib/setData";
import { getData } from "@lib/getData";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Title } from "chart.js";

Chart.register(ArcElement, Tooltip, Title);

export default function Dashboard() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(new User("", "", 0, [], [], []));

  const budgetData = {
    labels: user.expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Expenses",
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

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.email) {
        const resUser = await getData(session?.user?.email);
        resUser.assets = resUser.assets.sort((a, b) => {
          return b.value - a.value;
        });
        resUser.debts = resUser.debts.sort((a, b) => {
          return b.value - a.value;
        });
        resUser.expenses = resUser.expenses.sort((a, b) => {
          return b.value - a.value;
        });
        setUser(resUser);
      } else {
        setUser(new User("", "", 0, [], [], []));
      }
    }
    fetchUser();
  }, [session]);

  return (
    <form
      onSubmit={async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const formValues: User = {
          email: user.email,
          full_name: formData.get("name") as string,
          salary: Number(
            (formData.get("salary") as string)?.replace(/,/g, "") || 0
          ),
          assets: formData.getAll("assets").map((name, i) => ({
            name: name as string,
            value:
              Number(
                (formData.getAll("assetsVal")[i] as string)?.replace(/,/g, "")
              ) || 0,
            APY:
              Number(
                (formData.getAll("assetsAPY")[i] as string)?.replace(
                  /[^\d.-]/g,
                  ""
                )
              ) || 0,
          })),
          debts: formData.getAll("debts").map((name, i) => ({
            name: name as string,
            value:
              Number(
                (formData.getAll("debtsVal")[i] as string)?.replace(/,/g, "")
              ) || 0,
            APR:
              Number(
                (formData.getAll("debtsAPR")[i] as string)?.replace(
                  /[^\d.-]/g,
                  ""
                )
              ) || 0,
          })),
          expenses: formData.getAll("expenses").map((name, i) => ({
            name: name as string,
            value:
              Number(
                (formData.getAll("expensesVal")[i] as string)?.replace(/,/g, "")
              ) || 0,
          })),
        };

        await setData(formValues, user);
        location.reload();
      }}
      className="flex flex-col items-center"
      id="dashboardForm"
    >
      <div className="container text-xl">
        <p>Email: {user.email}</p>
        <p>
          Name: <input defaultValue={user.full_name} name="name" />
        </p>
        <p>
          Salary: $
          <input
            defaultValue={(user.salary / 1).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            name="salary"
          />
          /year
        </p>
      </div>
      <div className="container flex flex-col sm:grid grid-cols-2">
        <div className="m-auto">
          <p className="text-xl">
            Monthly Budget: $
            {(user.salary / 12).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            /month
          </p>
          <p>Monthly Expenses:</p>
          <ul className="pl-5 list-disc" id="expenseList">
            {user.expenses.map((expense, index) => (
              <li key={index} className="">
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
                  defaultValue={expense.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  onChange={(e) => {
                    const newValue = Number(
                      e.target.value.replace(/,/g, "") || 0
                    );
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.map((exp, i) =>
                        i === index ? { ...exp, value: newValue } : exp
                      ),
                    }));
                  }}
                />
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.filter((_, i) => i !== index),
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
              setUser((prev) => ({
                ...prev,
                expenses: [...prev.expenses, { name: "", value: 0 }],
              }));
            }}
          >
            Add Expense
          </button>
          <p>
            Remaining: $
            {(
              user.salary / 12 -
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
        <div className="flex h-100 w-full flex-col">
          <p className="m-auto text-xl">Budget Breakdown</p>
          <Doughnut data={budgetData} className="m-auto self-center" />
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
          <p className="text-xl">Assets:</p>
          <ul className="pl-5 list-disc" id="assetsList">
            {user.assets.map((asset, index) => (
              <li key={index}>
                <input type="text" name="assets" defaultValue={asset.name} />$
                <input
                  type="text"
                  name="assetsVal"
                  defaultValue={asset.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                />
                APY:
                <input type="text" name="assetsAPY" defaultValue={asset.APY} />
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.filter((_, i) => i !== index),
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
              setUser((prev) => ({
                ...prev,
                assets: [...prev.assets, { name: "", value: 0, APY: 0 }],
              }));
            }}
          >
            Add Asset
          </button>
        </div>
        <div className="container">
          <p className="text-xl">Debts:</p>
          <ul className="pl-5 list-disc" id="debtsList">
            {user.debts.map((debt, index) => (
              <li key={index}>
                <input type="text" name="debts" defaultValue={debt.name} />$
                <input
                  type="text"
                  name="debtsVal"
                  defaultValue={debt.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                />
                APR:
                <input type="text" name="debtsAPR" defaultValue={debt.APR} />
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.filter((_, i) => i !== index),
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
              setUser((prev) => ({
                ...prev,
                debts: [...prev.debts, { name: "", value: 0, APR: 0 }],
              }));
            }}
          >
            Add Debt
          </button>
        </div>
      </div>
      {session?.user?.email ? (
        <button className="btn" type="submit">
          Save Info
        </button>
      ) : null}
    </form>
  );
}
