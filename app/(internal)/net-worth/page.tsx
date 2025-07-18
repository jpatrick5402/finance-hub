"use client";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Form from "next/form";
import { useContext } from "react";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);

  const netWorthGraphData = {
    labels: user.net_worth_history.map((item) => item.date),
    datasets: [
      {
        label: "Net Worth $",
        data: user.net_worth_history.map((item) => item.value),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };

  const net_worth =
    user.fixed_assets.reduce(
      (total: number, asset: any) => total + asset.value,
      0
    ) +
    user.invested_assets.reduce(
      (total: number, asset: any) => total + asset.value,
      0
    ) -
    user.debts.reduce((total: number, debt: any) => total + debt.value, 0);

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="flex container text-2xl">
        <p className="m-auto">
          Net Worth: $
          {net_worth.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row container">
        <div className="m-auto">
          <Line
            data={netWorthGraphData}
            options={options}
            className="flex m-auto w-50%"
          />
        </div>
        <div className="flex-col m-auto">
          <List
            attributeList={user.net_worth_history}
            columnList={["date", "value"]}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-row container">
          <div className="flex-col">
            <p className="text-2xl">
              Assets $
              {(
                user.fixed_assets.reduce(
                  (total: number, asset: any) => total + asset.value,
                  0
                ) +
                user.invested_assets.reduce(
                  (total: number, asset: any) => total + asset.value,
                  0
                )
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xl">
              Fixed Assets $
              {user.fixed_assets
                .reduce((total: number, asset: any) => total + asset.value, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
            <List
              attributeList={user.fixed_assets}
              columnList={["name", "value", "interest", "category"]}
            />
            <p className="text-xl">
              Invested Assets $
              {user.invested_assets
                .reduce((total: number, asset: any) => total + asset.value, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
            <List
              attributeList={user.invested_assets}
              columnList={["name", "value", "interest", "category"]}
            />
          </div>
        </div>
        <div className="container">
          <div className="flex-col">
            <p className="text-2xl">
              Debts $
              {user.debts
                .reduce((total: number, debt: any) => total + debt.value, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
            <List
              attributeList={user.debts}
              columnList={["name", "value", "interest", "category"]}
            />
          </div>
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
