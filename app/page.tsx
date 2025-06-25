import User from "@models/User";
import { neon } from "@neondatabase/serverless";
import { useContext } from "react";
import { userContext } from "@lib/userContext";

export default function Home() {
  //  new User(
  //  "100",
  //  "Billy",
  //  "Billy@test.com",
  //  100000,
  //  [{ name: "Utilities", value: 200 }],
  //  [
  //    { name: "House", value: 300000 },
  //    { name: "Gold", value: 10000 },
  //  ],
  //  [{ name: "Mortgage", value: 250000, APR: 0.04 }]
  //);

  // import user context
  let user = useContext(userContext);
  console.log(user);

  // turn user json into user object

  let expenseTotal = user.expenses.reduce(
    (total: number, expense: any) => total + expense.value,
    0
  );
  let assetsTotal = user.assets.reduce(
    (total: number, asset: any) => total + asset.value,
    0
  );
  let debtsTotal = user.debts.reduce(
    (total: number, debt: any) => total + debt.value,
    0
  );

  const now = new Date();
  const readableTime = now.toLocaleTimeString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  async function setUserData(
    id: string,
    email: string,
    name: string,
    salary: number,
    assets: any[],
    debts: any[],
    expenses: any[]
  ) {
    "use server";
    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`INSERT INTO Users VALUES (${id}, ${email}, ${name}, ${salary.toString()}, ${JSON.stringify(
      assets
    )}, ${JSON.stringify(debts)}, ${JSON.stringify(
      expenses
    )}) ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      salary = EXCLUDED.salary,
      assets = EXCLUDED.assets,
      debts = EXCLUDED.debts,
      expenses = EXCLUDED.expenses`;

    console.log(`${name}'s data has been successfully uploaded!`);
  }

  // async function getUserData(email: string) {
  //   "use server";
  //   const sql = neon(`${process.env.DATABASE_URL}`);
  //   // Insert the comment from the form into the Postgres database
  //   const res = await sql`SELECT * FROM Users WHERE email=(${email})`;
  //   console.log(res[0]);
  // }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={setUserData.bind(
          null,
          user.id,
          user.email,
          user.name,
          user.salary,
          user.assets,
          user.debts,
          user.expenses
        )}
      >
        upload
      </button>
      <div className="container text-xl">
        <p>Name: {user.name}</p>
        <p>
          Salary: $
          {user.salary.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>Email: {user.email}</p>
        <p>Accurate as of {readableTime}</p>
      </div>
      <div className="container">
        <p className="text-xl">
          Monthly Budget: $
          {(user.salary / 12).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>Monthly Expenses:</p>
        <ul className="pl-5 list-disc">
          {user.expenses.map((expense, index) => (
            <li key={index} className="">
              {expense.name} | -$
              {expense.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </li>
          ))}
        </ul>
        <p>
          Remaining: $
          {(user.salary / 12 - expenseTotal).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="flex flex-col columns-1 gap-0 sm:gap-3 sm:flex-row sm:columns-2 w-full">
        <div className="container">
          <p className="text-xl">Assets:</p>
          <ul className="pl-5 list-disc">
            {user.assets.map((asset, index) => (
              <li key={index}>
                {asset.name} | $
                {asset.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                (APY: {asset.APY})
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          <p className="text-xl">Debts:</p>
          <ul className="pl-5 list-disc">
            {user.debts.map((debt, index) => (
              <li key={index}>
                {debt.name} | $
                {debt.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                (APR: {debt.APR})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container text-xl">
        Net Worth: $
        {(assetsTotal - debtsTotal).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}
