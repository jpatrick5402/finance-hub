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
import { getAssetChartInfo } from "@lib/chartData";

Chart.register(ArcElement, Tooltip, Title);

export default function Assets() {
  const [user, setUser] = useContext(UserContext);

  const [
    fixedAssetsData,
    investedAssetsData,
    totalAssetsData,
    fixedOptions,
    investedOptions,
    totalOptions,
  ]: any = getAssetChartInfo(user);
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
            })}
          </p>
        </div>
      </div>
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut data={fixedAssetsData} options={fixedOptions} />
        </div>
        <div className="m-auto">
          <Doughnut data={investedAssetsData} options={investedOptions} />
        </div>
        <div className="m-auto">
          <Doughnut data={totalAssetsData} options={totalOptions} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col container">
          <div className="m-auto mt-0 mb-0 flex flex-row">
            <InfoIcon infoText="Assets that have no standard variance in value (i.e. gold, cash, vehicles, ...)" />
            <p className="text-2xl">Fixed Assets</p>
          </div>
          <List
            attributeList={user.fixed_assets}
            columnList={["name", "value", "category"]}
          />
        </div>
        <div className="flex flex-col container">
          <div className="m-auto mt-0 mb-0 flex flex-row">
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
