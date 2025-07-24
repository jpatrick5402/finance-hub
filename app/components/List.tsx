import { useContext, useState } from "react";

import UserContext from "@contexts/UserContext";
import { reductionParse } from "@lib/reductionParse";
import TagInput from "@components/TagInput";

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
    <div className="flex flex-col m-auto mt-0 p-2">
      <div className="flex flex-row gap-2">
        {attributeName !== "net_worth_history" && (
          <>
            <p className="text-sm text-(--foreground)">Quick sort:</p>
            <select
              className="bg-(--background-accent) rounded p-1 text-sm"
              onChange={(e) => {
                let sorted = [...attributeList];
                if (e.target.value === "name") {
                  sorted.sort((a, b) => a.name.localeCompare(b.name));
                } else if (e.target.value === "value") {
                  sorted.sort((a, b) => b.value - a.value);
                } else if (e.target.value === "interest") {
                  sorted.sort((a, b) => b.interest - a.interest);
                } else if (e.target.value === "category") {
                  sorted.sort((a, b) => {
                    const aCategories = Array.isArray(a.category)
                      ? a.category
                      : [a.category || ""];
                    const bCategories = Array.isArray(b.category)
                      ? b.category
                      : [b.category || ""];
                    const aFirst = aCategories[0] || "";
                    const bFirst = bCategories[0] || "";
                    return aFirst.localeCompare(bFirst);
                  });
                }
                if (e.target.value !== "none") {
                  setUser((prev: any) => ({
                    ...prev,
                    [attributeName]: sorted,
                  }));
                }
              }}
            >
              <option value="none">Choose Column...</option>
              <option value="name">Name</option>
              <option value="value">Value</option>
              {attributeName != "expenses" && (
                <option value="interest">Interest</option>
              )}
              <option value="category">Category</option>
            </select>
          </>
        )}
      </div>
      <ul>
        {attributeList.map((item, index) => {
          return (
            <li key={index} className="flex mb-1">
              <input
                type="checkbox"
                checked={item.active}
                value={item.active}
                onChange={(e) => {
                  setUser((prev: any) => ({
                    ...prev,
                    [attributeName]: prev[attributeName].map(
                      (cur: any, i: number) =>
                        i === index ? { ...cur, active: !item.active } : cur
                    ),
                  }));
                }}
              />
              {columnList.map((column, i2) => {
                if (column === "category") {
                  // Convert string to array if needed for backward compatibility
                  const categoryTags = Array.isArray(item[column])
                    ? item[column]
                    : item[column]
                    ? [item[column]]
                    : [];

                  return (
                    <TagInput
                      key={i2}
                      tags={categoryTags}
                      placeholder="Add categories..."
                      className="w-full m-1"
                      onChange={(tags) => {
                        setUser((prev: any) => ({
                          ...prev,
                          [attributeName]: prev[attributeName].map(
                            (cur: any, i: number) =>
                              i === index ? { ...cur, [column]: tags } : cur
                          ),
                        }));
                      }}
                    />
                  );
                }

                return (
                  <input
                    key={i2}
                    className="w-full border-b-2 border-b-(--color-primary) pl-2 m-1"
                    title={column.charAt(0).toUpperCase() + column.slice(1)}
                    type={column === "date" ? "date" : "text"}
                    step={
                      column === "value" || column === "interest"
                        ? "any"
                        : undefined
                    }
                    value={item[column]}
                    placeholder={
                      column.charAt(0).toUpperCase() + column.slice(1)
                    }
                    onChange={(e) => {
                      e.target.style.borderColor = "";
                      let val: any = e.target.value;

                      if (column === "value" || column === "interest") {
                        if (val === "") {
                          val = null;
                        } else if (
                          !/^\d*\.?\d{0,2}$/.test(val) ||
                          isNaN(parseFloat(val))
                        ) {
                          e.target.style.borderColor = "red";
                          if (e.target.value.length === 1) e.target.value = "";
                          return;
                        }
                      }

                      setUser((prev: any) => ({
                        ...prev,
                        [attributeName]: prev[attributeName].map(
                          (cur: any, i: number) =>
                            i === index ? { ...cur, [column]: val } : cur
                        ),
                      }));
                    }}
                  />
                );
              })}
              <button
                type="button"
                className="flex mb-auto mt-auto ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2 hover:bg-white hover:text-black transition-all duration-300"
                onClick={(e) => {
                  setUser((prev: any) => ({
                    ...prev,
                    [attributeName]: prev[attributeName].filter(
                      (_: any, i: number) => i !== index
                    ),
                  }));
                }}
              >
                <p className="m-auto">X</p>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="bg-(--color-green) p-2 m-2 ml-auto mr-auto rounded hover:bg-(--color-secondary) hover:text-black hover:cursor-pointer"
        type="button"
        onClick={async (e) => {
          setUser((prev: any) => ({
            ...prev,
            [attributeName]: [
              ...prev[attributeName],
              attributeName === "net_worth_history"
                ? {
                    active: true,
                    date: new Date().toISOString().slice(0, 10),
                    value: (
                      user.fixed_assets.reduce(
                        (total: number, item: any) =>
                          reductionParse(total, item),
                        0
                      ) +
                      user.invested_assets.reduce(
                        (total: number, item: any) =>
                          reductionParse(total, item),
                        0
                      ) -
                      user.debts.reduce(
                        (total: number, item: any) =>
                          reductionParse(total, item),
                        0
                      )
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                  }
                : {
                    active: true,
                    name: "",
                    value: "",
                    interest: "",
                    category: [],
                  },
            ],
          }));
        }}
      >
        Add
        {attributeName[attributeName.length - 1] !== "s"
          ? " " + attributeName.replaceAll("_", " ")
          : " " + attributeName.replaceAll("_", " ").slice(0, -1)}
      </button>
    </div>
  );
}
