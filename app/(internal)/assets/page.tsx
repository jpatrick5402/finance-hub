"use client";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);

  // --- Chart Data ---

  const fixedAssetsData = {
    labels: user.fixed_assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: user.fixed_assets.map((asset) => asset.value),
        backgroundColor: [
          "rgba(50, 255, 56, 0.2)",
          "rgba(81, 255, 86, 0.2)",
          "rgba(125, 255, 129, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(34, 139, 34, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(144, 238, 144, 0.2)",
          "rgba(60, 179, 113, 0.2)",
          "rgba(46, 139, 87, 0.2)",
          "rgba(50, 205, 50, 0.2)",
        ],
      },
    ],
  };
  const investedAssetsData = {
    labels: user.invested_assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: user.invested_assets.map((asset) => asset.value),
        backgroundColor: [
          "rgba(50, 255, 56, 0.2)",
          "rgba(81, 255, 86, 0.2)",
          "rgba(125, 255, 129, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(34, 139, 34, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(144, 238, 144, 0.2)",
          "rgba(60, 179, 113, 0.2)",
          "rgba(46, 139, 87, 0.2)",
          "rgba(50, 205, 50, 0.2)",
        ],
      },
    ],
  };
  const totalAssetsData = {
    labels: [
      ...user.fixed_assets.map((asset) => asset.name),
      ...user.invested_assets.map((asset) => asset.name),
    ],
    datasets: [
      {
        label: "$",
        data: [
          ...user.fixed_assets.map((asset) => asset.value),
          ...user.invested_assets.map((asset) => asset.value),
        ],
        backgroundColor: [
          "rgba(50, 255, 56, 0.2)",
          "rgba(81, 255, 86, 0.2)",
          "rgba(125, 255, 129, 0.2)",
          "rgba(0, 255, 0, 0.2)",
          "rgba(34, 139, 34, 0.2)",
          "rgba(0, 128, 0, 0.2)",
          "rgba(144, 238, 144, 0.2)",
          "rgba(60, 179, 113, 0.2)",
          "rgba(46, 139, 87, 0.2)",
          "rgba(50, 205, 50, 0.2)",
        ],
      },
    ],
  };

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="flex container">
        <p className="text-2xl m-auto">
          Total Assets: $
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
      </div>
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut
            data={fixedAssetsData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text:
                    "Fixed: $" +
                    user.fixed_assets
                      .reduce((total, asset) => total + asset.value, 1)
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                  color: "#FFFFFF",
                },
              },
            }}
          />
        </div>
        <div className="m-auto">
          <Doughnut
            data={investedAssetsData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text:
                    "Invested: $" +
                    user.invested_assets
                      .reduce((total, asset) => total + asset.value, 1)
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                  color: "#FFFFFF",
                },
              },
            }}
          />
        </div>
        <div className="m-auto">
          <Doughnut
            data={totalAssetsData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text:
                    "Total: $" +
                    (
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
                    }),
                  color: "#FFFFFF",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col container">
          <p className="text-2xl m-auto mt-0">Fixed Assets</p>
          <List attribute={user.fixed_assets} />
        </div>
        <div className="flex flex-col container">
          <p className="text-2xl m-auto mt-0">Invested Assets</p>
          <List attribute={user.invested_assets} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          console.log(user);
        }}
      >
        Check user
      </button>
      <SaveButton />
    </Form>
  );
}
