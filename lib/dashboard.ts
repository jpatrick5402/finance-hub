import User from "@models/User";
import React from "react";
import { setData } from "@lib/setData";

export function getBudgetData(user: User) {
  return {
    labels: user.expenses.map((expense) => expense.name),
    datasets: [
      {
        label: "Expenses",
        data: user.expenses.map((expense) => expense.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

export async function handleForm(e: React.FormEvent, user: User) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);

  const formValues: User = {
    email: user.email,
    full_name: formData.get("name") as string,
    salary: Number((formData.get("salary") as string)?.replace(/,/g, "") || 0),
    assets: formData.getAll("assets").map((name, i) => ({
      name: name as string,
      value:
        Number(
          (formData.getAll("assetsVal")[i] as string)?.replace(/,/g, "")
        ) || 0,
      APY:
        Number(
          (formData.getAll("assetsAPY")[i] as string)?.replace(/[^\d.-]/g, "")
        ) || 0,
    })),
    debts: formData.getAll("debts").map((name, i) => ({
      name: name as string,
      value:
        Number((formData.getAll("debtsVal")[i] as string)?.replace(/,/g, "")) ||
        0,
      APR:
        Number(
          (formData.getAll("debtsAPR")[i] as string)?.replace(/[^\d.-]/g, "")
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

  await setData(formValues, user);
  location.reload();
}
