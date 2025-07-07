import UserContext from "@contexts/UserContext";
import { useContext } from "react";

export default function userForm() {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      {/* This section is for data testing only */}
      <div className="container">
        <p className="text-xl">TEST</p>
        {/* Name */}
        <input
          type="text"
          value={user.full_name}
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              full_name: e.target.value,
            }));
          }}
        />
        {/* Email */}
        <p>{user.email}</p>
        {/* Salary */}
        <input
          type="text"
          value={user.salary}
          onChange={(e) => {
            setUser((prev) => ({
              ...prev,
              salary: Number(e.target.value),
            }));
          }}
        />
        {/* Expenses */}
        <ul>
          {user.expenses.map((exp, index) => {
            return (
              <li key={index}>
                <input
                  type="text"
                  value={exp.name}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.map((expense, i) =>
                        i === index
                          ? { ...expense, name: e.target.value }
                          : expense
                      ),
                    }));
                  }}
                />
                <input
                  type="text"
                  value={exp.value}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.map((expense, i) =>
                        i === index
                          ? { ...expense, value: Number(e.target.value) }
                          : expense
                      ),
                    }));
                  }}
                />
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      expenses: prev.expenses.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <input type="text" id="newExpenseName" placeholder="Name" />
        <input type="text" id="newExpenseVal" placeholder="Value" />
        <button
          className="bg-(--color-green) p-2 m-2 rounded"
          type="button"
          onClick={async (e) => {
            await setUser((prev) => ({
              ...prev,
              expenses: [
                ...prev.expenses,
                {
                  name: "",
                  value: 0,
                  category: "",
                },
              ],
            }));
          }}
        >
          Add Expense
        </button>
        {/* Assets */}
        <ul>
          {user.assets.map((asset, index) => {
            return (
              <li key={index}>
                <input
                  type="text"
                  value={asset.name}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.map((cur, i) =>
                        i === index ? { ...cur, name: e.target.value } : cur
                      ),
                    }));
                  }}
                />
                <input
                  type="text"
                  value={asset.value}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.map((cur, i) =>
                        i === index
                          ? { ...cur, value: Number(e.target.value) }
                          : cur
                      ),
                    }));
                  }}
                />
                <input
                  type="text"
                  value={asset.APY}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.map((cur, i) =>
                        i === index
                          ? { ...cur, APY: Number(e.target.value) }
                          : cur
                      ),
                    }));
                  }}
                />
                <button
                  type="button"
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  onClick={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      assets: prev.assets.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="bg-(--color-green) p-2 m-2 rounded"
          type="button"
          onClick={async (e) => {
            await setUser((prev) => ({
              ...prev,
              assets: [
                ...prev.assets,
                {
                  name: "",
                  value: 0,
                  APY: 0,
                  category: "",
                },
              ],
            }));
          }}
        >
          Add Asset
        </button>
        {/* Debts */}
        <ul>
          {user.debts.map((debt, index) => {
            return (
              <li key={index}>
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.map((cur, i) =>
                        i === index ? { ...cur, name: e.target.value } : cur
                      ),
                    }));
                  }}
                />
                <input
                  type="text"
                  value={debt.value}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.map((cur, i) =>
                        i === index
                          ? { ...cur, value: Number(e.target.value) }
                          : cur
                      ),
                    }));
                  }}
                />
                <input
                  type="text"
                  value={debt.APR}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.map((cur, i) =>
                        i === index
                          ? { ...cur, APR: Number(e.target.value) }
                          : cur
                      ),
                    }));
                  }}
                />
                <button
                  className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                  type="button"
                  onClick={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      debts: prev.debts.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="bg-(--color-green) p-2 m-2 rounded"
          type="button"
          onClick={async (e) => {
            await setUser((prev) => ({
              ...prev,
              debts: [
                ...prev.debts,
                {
                  name: "",
                  value: 0,
                  APR: 0,
                  category: "",
                },
              ],
            }));
          }}
        >
          Add Debt
        </button>
      </div>
    </>
  );
}
