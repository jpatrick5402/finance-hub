"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import User from "@models/User";
import { save } from "@lib/save";
import { getData } from "@lib/getData";

export default function Dashboard() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>(new User("", "", 0, [], [], []));

  useEffect(() => {
    async function fetchUser() {
      if (session?.user?.email) {
        const resUser = await getData(session?.user?.email);
        resUser.email = session?.user?.email;
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
            APY: Number(formData.getAll("assetsAPY")[i]) || 0,
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

        await save(formValues, user);
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
      <div className="container">
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
              <input type="text" name="expenses" defaultValue={expense.name} />
              $
              <input
                type="text"
                name="expensesVal"
                defaultValue={expense.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              />
              <button
                type="button"
                className="ml-2 p-1 rounded bg-(--color-primary) btn-sm"
                onClick={() => {
                  setUser((prev) => ({
                    ...prev,
                    expenses: prev.expenses.filter((_, i) => i !== index),
                  }));
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn"
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
                  className="ml-2 p-1 rounded bg-(--color-primary) btn-sm"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn"
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
                  className="ml-2 p-1 rounded bg-(--color-primary) btn-sm"
                  onClick={() => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn"
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
      {session?.user?.email ? (
        <button className="btn" type="submit">
          Save Info
        </button>
      ) : null}
    </form>
  );
}
