import User from "@components/User";

export default function Home() {
  let test = new User("Bob", "Bob@test.com", 0, [], [], []);
  test.assets.push({ name: "House", value: 300000, APY: 0.03 });
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
    <div>
      <div className="container text-xl">Name: {test.name}</div>
      <div className="container text-xl">
        Net Worth: {(assetsTotal - debtsTotal).toFixed(2)}
      </div>
      <div className="container">
        <p className="text-xl">
          Monthly Budget: ${(test.salary / 12).toFixed(2)}
        </p>
        <p>Monthly Expenses:</p>
        <ul>
          {test.expenses.map((expense, index) => (
            <li key={index}>
              {expense.name} | -${expense.value.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Remaining: ${(test.salary - expenseTotal).toFixed(2)}</p>
      </div>
      <div className="columns-2 gap-4">
        <div className="container">
          <p className="text-xl">Assets:</p>
          <ul>
            {test.assets.map((asset, index) => (
              <li key={index}>
                {asset.name} | ${asset.value.toFixed(2)} (APY: {asset.APY})
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          <p className="text-xl">Debts:</p>
          <ul>
            {test.debts.map((debt, index) => (
              <li key={index}>
                {debt.name} | -${debt.value.toFixed(2)} (APR: {debt.APR})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
