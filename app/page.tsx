import User from "@components/User";

export default function Home() {
  let test = new User("Bob", "Bob@test.com", 0, [], [], []);
  test.assets.push({ name: "House", value: 300000, APY: 0.03 });
  test.assets.push({ name: "Gold", value: 10000, APY: 0.05 });
  test.debts.push({ name: "Mortgage", value: 250000, APR: 0.04 });
  test.expenses.push({ name: "Utilities", value: 200 });
  test.salary = 50000;
  let expenseTotal = test.expenses.reduce(
    (total, expense) => total + expense.value,
    0
  );
  let assetsTotal = test.assets.reduce(
    (total, asset) => total + asset.value,
    0
  );
  let debtsTotal = test.debts.reduce((total, debt) => total + debt.value, 0);

  return (
    <div className="flex flex-col items-center">
      <div className="container text-xl">
        <p>Name: {test.name}</p>
        <p>
          Salary: $
          {test.salary.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
        </p>
        <p>Email: {test.email}</p>
      </div>
      <div className="container">
        <p className="text-xl">
          Monthly Budget: $
          {(test.salary / 12).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p>Monthly Expenses:</p>
        <ul className="pl-5 list-disc">
          {test.expenses.map((expense, index) => (
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
          {(test.salary / 12 - expenseTotal).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="flex flex-col columns-1 gap-0 sm:gap-3 sm:flex-row sm:columns-2 w-full">
        <div className="container">
          <p className="text-xl">Assets:</p>
          <ul className="pl-5 list-disc">
            {test.assets.map((asset, index) => (
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
            {test.debts.map((debt, index) => (
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
