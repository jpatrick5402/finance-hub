"use client";
import InfoIcon from "@components/InfoIcon";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

export default function Assets() {
  const [user, setUser] = useContext(UserContext);

  // --- Chart Data ---

  const fixedAssetsData = {
    labels: user.fixed_assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: [
          ...user.fixed_assets.map((asset) => asset.value),
          user.fixed_assets.length == 0 && 1,
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
  const investedAssetsData = {
    labels: user.invested_assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: [
          ...user.invested_assets.map((asset) => asset.value),
          user.invested_assets.length == 0 && 1,
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
          user.fixed_assets.length == 0 && 1,
          user.invested_assets.length == 0 && 1,
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
        <div className="m-auto flex flex-row">
          <InfoIcon infoText="A combined total of all assets" />
          <p className="text-2xl">
            Total Assets: $
            {(
              user.fixed_assets.reduce((total: number, item: any) => {
                let data = parseFloat(item.value);
                return !isNaN(data)
                  ? total + parseFloat(item.value)
                  : total + 0;
              }, 0) +
              user.invested_assets.reduce((total: number, item: any) => {
                let data = parseFloat(item.value);
                return !isNaN(data)
                  ? total + parseFloat(item.value)
                  : total + 0;
              }, 0)
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut
            data={fixedAssetsData}
            options={{
              plugins: {
                title: {
                  display: true,
                  font: {
                    size: 14,
                  },
                  text:
                    "Fixed: $" +
                    user.fixed_assets
                      .reduce((total, item: any) => {
                        let data = parseFloat(item.value);
                        return !isNaN(data)
                          ? total + parseFloat(item.value)
                          : total + 0;
                      }, 0)
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                  color: "#000000",
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
                  font: {
                    size: 14,
                  },
                  text:
                    "Invested: $" +
                    user.invested_assets
                      .reduce((total, item: any) => {
                        let data = parseFloat(item.value);
                        return !isNaN(data)
                          ? total + parseFloat(item.value)
                          : total + 0;
                      }, 0)
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                  color: "#000000",
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
                  font: {
                    size: 14,
                  },
                  text:
                    "Total: $" +
                    (
                      user.fixed_assets.reduce((total: number, item: any) => {
                        let data = parseFloat(item.value);
                        return !isNaN(data)
                          ? total + parseFloat(item.value)
                          : total + 0;
                      }, 0) +
                      user.invested_assets.reduce(
                        (total: number, item: any) => {
                          let data = parseFloat(item.value);
                          return !isNaN(data)
                            ? total + parseFloat(item.value)
                            : total + 0;
                        },
                        0
                      )
                    ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }),
                  color: "#000000",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col container">
          <div className="m-auto mt-0 flex flex-row">
            <InfoIcon infoText="Assets that have no standard variance in value (i.e. gold, cash, vehicles, ...)" />
            <p className="text-2xl">Fixed Assets</p>
          </div>
          <List
            attributeList={user.fixed_assets}
            columnList={["name", "value", "category"]}
          />
        </div>
        <div className="flex flex-col container">
          <div className="m-auto mt-0 flex flex-row">
            <InfoIcon infoText="Assets that vary in value (i.e. stocks, bonds, ...)" />
            <p className="text-2xl">Invested Assets</p>
          </div>
          <List
            attributeList={user.invested_assets}
            columnList={["name", "value", "interest", "category"]}
          />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
