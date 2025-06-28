import SignIn from "@components/SignIn";

import User from "@/models/User";

export default function Dashboard() {
  let user = new User("", "", "", 0, [], [], []);
  return (
    <div className="flex flex-col items-center">
      <div className="container text-xl">
        <p>Name: {user.full_name}</p>
        <p>
          Salary: $
          {(user.salary / 1).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          /year
        </p>
        <p>Email: {user.email}</p>
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
    </div>
  );
}
