import { useContext, useState } from "react";

import UserContext from "@contexts/UserContext";

// List generates a modifiable list of the specified columns
export default function List({
  attributeList,
  columnList,
}: {
  attributeList: any[];
  columnList: any[];
}) {
  const [user, setUser] = useContext(UserContext);

  // Helper to update an item in the given attribute array
  const updateItem = (index: number, updatedFields: Partial<any>) => {};

  // Helper to remove an item from the given attribute array
  const removeItem = (index: number) => {};

  // Determine the attribute name from the prop
  const attributeName =
    (Object.keys(user).find((key) => (user as any)[key] === attributeList) as
      | keyof typeof user
      | undefined) || "assets";

  return (
    <div className="flex-col m-auto">
      <div className="flex flex-row gap-2">
        <p>Sort:</p>
        <select
          className="bg-(--color-primary) rounded p-1"
          onChange={(e) => {
            let sorted = [...attributeList];
            if (e.target.value === "name") {
              sorted.sort((a, b) => a.name.localeCompare(b.name));
            } else if (e.target.value === "value") {
              sorted.sort((a, b) => b.value - a.value);
            } else if (e.target.value === "interest") {
              sorted.sort((a, b) => b.interest - a.interest);
            } else if (e.target.value === "category") {
              sorted.sort((a, b) => b.category.localeCompare(a.category));
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
          {attributeName != "expenses" && (
            <option value="interest">Interest</option>
          )}
          <option value="category">Category</option>
        </select>
      </div>
      <ul>
        {attributeList.map((item, index) => {
          return (
            <li key={index} className="flex mb-1">
              {columnList.map((column, i2) => {
                return (
                  <input
                    key={i2}
                    className="w-full border-b-2 border-b-(--color-primary) pl-2 m-1"
                    title={column.charAt(0).toUpperCase() + column.slice(1)}
                    type={column === "date" ? "date" : "text"}
                    value={item[column]}
                    placeholder={
                      column.charAt(0).toUpperCase() + column.slice(1)
                    }
                    onChange={(e) => {
                      if (
                        (column === "value" || column === "interest") &&
                        Number.isNaN(Number(e.target.value))
                      ) {
                        alert("Not a correct value");
                      } else {
                        setUser((prev: any) => ({
                          ...prev,
                          [attributeName]: prev[attributeName].map(
                            (cur: any, i: number) =>
                              i === index
                                ? {
                                    ...cur,
                                    ...{
                                      [column]:
                                        Number(e.target.value) ||
                                        e.target.value,
                                    },
                                  }
                                : cur
                          ),
                        }));
                      }
                    }}
                  />
                );
              })}
              <button
                type="button"
                className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                onClick={(e) => {
                  setUser((prev: any) => ({
                    ...prev,
                    [attributeName]: prev[attributeName].filter(
                      (_: any, i: number) => i !== index
                    ),
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
        className="bg-(--color-green) p-2 m-2 rounded hover:bg-(--color-secondary) hover:text-black hover:cursor-pointer"
        type="button"
        onClick={async (e) => {
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
        }}
      >
        Add
        {" " +
          attributeName.charAt(0).toUpperCase() +
          attributeName.replaceAll("_", " ").slice(1)}
      </button>
    </div>
  );
}
