"use client";
import InfoIcon from "@components/InfoIcon";
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
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import Form from "next/form";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { reductionParse } from "@lib/reductionParse";
import { getNetWorthChartInfo } from "@lib/chartData";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  Tooltip
);

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);

  const net_worth =
    user.fixed_assets.reduce(
      (total: number, item: any) => reductionParse(total, item),
      0
    ) +
    user.invested_assets.reduce(
      (total: number, item: any) => reductionParse(total, item),
      0
    ) -
    user.debts.reduce(
      (total: number, item: any) => reductionParse(total, item),
      0
    );

  let [netWorthGraphData, netWorthOptions]: any = getNetWorthChartInfo(user);

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="flex container text-2xl">
        <div className="m-auto flex flex-row">
          <InfoIcon infoText="Net worth is the difference betweens all assets and all debts" />
          <p>
            Net Worth: $
            {net_worth.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row container">
        <div className="m-auto">
          <Line data={netWorthGraphData} options={netWorthOptions} />
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
          <div className="flex flex-col m-auto">
            <div className="flex flex-row ml-auto mr-auto ">
              <InfoIcon infoText="A combined total of all assets" />
              <p className="text-2xl">
                Assets $
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
            <div className="flex flex-row m-auto">
              <InfoIcon infoText="Assets that have no standard variance in value (i.e. gold, cash, vehicles, ...)" />
              <p className="text-xl">
                Fixed Assets $
                {user.fixed_assets
                  .reduce(
                    (total: number, item: any) => reductionParse(total, item),
                    0
                  )
                  .toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
            <List
              attributeList={user.fixed_assets}
              columnList={["name", "value", "category"]}
            />
            <div className="flex flex-row m-auto">
              <InfoIcon infoText="Assets that vary in value (i.e. stocks, bonds, ...)" />
              <p className="text-xl">
                Invested Assets $
                {user.invested_assets
                  .reduce(
                    (total: number, item: any) => reductionParse(total, item),
                    0
                  )
                  .toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
            <List
              attributeList={user.invested_assets}
              columnList={["name", "value", "interest", "category"]}
            />
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col">
            <div className="flex flex-row ml-auto mr-auto">
              <InfoIcon infoText="A combined total of all debts" />
              <p className="text-2xl">
                Debts $
                {user.debts
                  .reduce(
                    (total: number, item: any) => reductionParse(total, item),
                    0
                  )
                  .toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
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
