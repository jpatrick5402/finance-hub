import UserContext from "@contexts/UserContext";
import User from "@models/User";
import { useContext } from "react";
import { reductionParse } from "./reductionParse";

export function getNetWorthChartInfo(user: User) {
  const activeHistory = user.net_worth_history.filter(
    (data: any) => data.active
  );
  return [
    {
      labels: activeHistory.map((item) => item.date),
      datasets: [
        {
          label: "Net Worth $",
          data: activeHistory.map((item) => item.value),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    },
    {
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
      },
    },
  ];
}

export function getDebtChartInfo(user: User) {
  const activeDebt = user.debts.filter((debt: any) => debt.active);
  return {
    labels: [...activeDebt.map((debt) => debt.name)],
    datasets: [
      {
        label: "$",
        data: [
          ...activeDebt.map((debt) => debt.value),
          user.debts.length == 0 && 1,
        ],
        backgroundColor: ["rgba(255, 50, 56, 0.2)"],
      },
    ],
  };
}

export function getBudgetChartInfo(user: User) {
  const monthlyIncome = Number(user.salary) / 12;
  const totalExpenses = user.expenses.reduce(
    (total: number, item: any) => reductionParse(total, item),
    0
  );
  const remaining = Math.floor(monthlyIncome - totalExpenses);
  const activeExpenses = user.expenses.filter((expense: any) => expense.active);

  return {
    labels: ["Remaining", ...activeExpenses.map((expense) => expense.name)],
    datasets: [
      {
        label: "Value $",
        data: [
          remaining > 0 ? remaining : 0,
          ...activeExpenses.map((expense) => expense.value),
          activeExpenses.length == 0 && 1,
        ],
        backgroundColor: [
          "rgba(100, 255, 100, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 81, 86, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
          "rgba(255, 50, 56, 0.2)",
        ],
      },
    ],
  };
}

export function getAssetChartInfo(user: User) {
  const activeFixedAssets = user.fixed_assets.filter(
    (asset: any) => asset.active
  );
  const activeInvestedAssets = user.invested_assets.filter(
    (asset: any) => asset.active
  );
  return [
    {
      labels: activeFixedAssets.map((asset) => asset.name),
      datasets: [
        {
          label: "$",
          data: [
            ...activeFixedAssets.map((asset) => asset.value),
            user.fixed_assets.length == 0 && 1,
          ],
          backgroundColor: ["rgba(50, 255, 56, 0.2)"],
        },
      ],
    },
    {
      labels: activeInvestedAssets.map((asset) => asset.name),
      datasets: [
        {
          label: "$",
          data: [
            ...activeInvestedAssets.map((asset) => asset.value),
            user.invested_assets.length == 0 && 1,
          ],
          backgroundColor: ["rgba(50, 255, 56, 0.2)"],
        },
      ],
    },
    {
      labels: [
        ...activeFixedAssets.map((asset) => asset.name),
        ...activeInvestedAssets.map((asset) => asset.name),
      ],
      datasets: [
        {
          label: "$",
          data: [
            ...activeFixedAssets.map((asset) => asset.value),
            ...activeInvestedAssets.map((asset) => asset.value),
            user.fixed_assets.length == 0 && 1,
            user.invested_assets.length == 0 && 1,
          ],
          backgroundColor: ["rgba(50, 255, 56, 0.2)"],
        },
      ],
    },
    {
      plugins: {
        title: {
          display: true,
          font: {
            size: 14,
          },
          text:
            "Fixed: $" +
            user.fixed_assets
              .reduce((total, item: any) => reductionParse(total, item), 0)
              .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
          color: "#000000",
        },
      },
    },
    {
      plugins: {
        title: {
          display: true,
          font: {
            size: 14,
          },
          text:
            "Invested: $" +
            user.invested_assets
              .reduce((total, item: any) => reductionParse(total, item), 0)
              .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
          color: "#000000",
        },
      },
    },
    {
      plugins: {
        title: {
          display: true,
          font: {
            size: 14,
          },
          text:
            "Total: $" +
            (
              user.fixed_assets.reduce(
                (total: number, item: any) => reductionParse(total, item),
                0
              ) +
              user.invested_assets.reduce(
                (total: number, item: any) => reductionParse(total, item),
                0
              )
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          color: "#000000",
        },
      },
    },
  ];
}
