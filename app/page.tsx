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

  return (
    <div>
      <div className="container">Name: {test.name}</div>
      <div className="container">Net Worth: {1000 - 200}</div>
      <div className="container">
        <p>Budget: ${test.salary}</p>
        <p>Expenses:</p>
        <ul>
          {test.expenses.map((expense, index) => (
            <li key={index}>
              {expense.name} | -${expense.value}
            </li>
          ))}
        </ul>
        <p>Remaining: ${test.salary - expenseTotal}</p>
      </div>
      <div className="columns-2 gap-4">
        <div className="container">
          Assets:
          <ul>
            {test.assets.map((asset, index) => (
              <li key={index}>
                {asset.name} | ${asset.value} (APY: {asset.APY})
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          Debts:
          <ul>
            {test.debts.map((debt, index) => (
              <li key={index}>
                {debt.name} | -${debt.value} (APR: {debt.APR})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
