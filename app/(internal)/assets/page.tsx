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
import { reductionParse } from "@lib/reductionParse";

Chart.register(ArcElement, Tooltip, Title);

export default function Assets() {
  const [user, setUser] = useContext(UserContext);

  // --- Chart Data ---
  const activeFixedAssets = user.fixed_assets.filter(
    (asset: any) => asset.active
  );
  const fixedAssetsData = {
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
  };
  const activeInvestedAssets = user.invested_assets.filter(
    (asset: any) => asset.active
  );
  const investedAssetsData = {
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
  };
  const totalAssetsData = {
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
                      .reduce(
                        (total, item: any) => reductionParse(total, item),
                        0
                      )
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
                      .reduce(
                        (total, item: any) => reductionParse(total, item),
                        0
                      )
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
                      user.fixed_assets.reduce(
                        (total: number, item: any) =>
                          reductionParse(total, item),
                        0
                      ) +
                      user.invested_assets.reduce(
                        (total: number, item: any) =>
                          reductionParse(total, item),
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
