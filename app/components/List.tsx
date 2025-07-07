import { useContext, useState } from "react";

import UserContext from "@contexts/UserContext";
import { Item } from "@models/User";

export default function UserList({ attribute }: { attribute: Item[] }) {
  const [user, setUser] = useContext(UserContext);

  // Helper to update an item in the given attribute array
  const updateItem = (index: number, updatedFields: Partial<Item>) => {
    setUser((prev: any) => ({
      ...prev,
      [attributeName]: prev[attributeName].map((cur: Item, i: number) =>
        i === index ? { ...cur, ...updatedFields } : cur
      ),
    }));
  };

  // Helper to remove an item from the given attribute array
  const removeItem = (index: number) => {
    setUser((prev: any) => ({
      ...prev,
      [attributeName]: prev[attributeName].filter(
        (_: Item, i: number) => i !== index
      ),
    }));
  };

  // Helper to add a new item to the given attribute array
  const addItem = () => {
    setUser((prev: any) => ({
      ...prev,
      [attributeName]: [
        ...prev[attributeName],
        {
          name: "",
          value: 0,
          interest: 0,
          category: "",
        },
      ],
    }));
  };

  // Determine the attribute name from the prop
  const attributeName =
    (Object.keys(user).find((key) => (user as any)[key] === attribute) as
      | keyof typeof user
      | undefined) || "assets";

  return (
    <>
      <div className="flex flex-row gap-2">
        <p>Sort:</p>
        <select
          onChange={(e) => {
            let sorted = [...attribute];
            if (e.target.value === "name") {
              sorted.sort((a, b) => b.name.localeCompare(a.name));
            } else if (e.target.value === "value") {
              sorted.sort((a, b) => b.value - a.value);
            } else if (e.target.value === "interest") {
              sorted.sort((a, b) => b.interest - a.interest);
            }
            if (e.target.value !== "none") {
              setUser((prev: any) => ({
                ...prev,
                [attributeName]: sorted,
              }));
            }
          }}
        >
          <option value="none"></option>
          <option value="name">Name</option>
          <option value="value">Value</option>
          <option value="interest">Interest</option>
        </select>
      </div>
      <ul>
        {attribute.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="text"
                value={item.name}
                placeholder="Name"
                onChange={(e) => {
                  updateItem(index, { name: e.target.value });
                }}
              />
              <input
                type="text"
                value={item.value}
                placeholder="Value"
                onChange={(e) => {
                  updateItem(index, { value: Number(e.target.value) });
                }}
              />
              {attributeName != "expenses" ? (
                <input
                  type="text"
                  value={item.interest}
                  placeholder="Interest"
                  onChange={(e) => {
                    updateItem(index, { interest: Number(e.target.value) });
                  }}
                />
              ) : null}
              <input
                type="text"
                value={item.category}
                placeholder="Category"
                onChange={(e) => {
                  updateItem(index, { category: e.target.value });
                }}
              />
              <button
                type="button"
                className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                onClick={(e) => {
                  removeItem(index);
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
          addItem();
        }}
      >
        Add {attributeName.charAt(0).toUpperCase() + attributeName.slice(1, -1)}
      </button>
    </>
  );
}
