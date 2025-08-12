"use client";
import { useContext } from "react";
import {
  Chart,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  ArcElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
import UserContext from "@contexts/UserContext";
import { Doughnut, Line } from "react-chartjs-2";
import {
  getAssetChartInfo,
  getBudgetChartInfo,
  getNetWorthChartInfo,
  getDebtChartInfo,
} from "@lib/chartData";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeSeriesScale,
  Tooltip
);

export default function Dashboard() {
  const [user, setUser] = useContext(UserContext);

  const [netWorthGraphData, netWorthOptions]: any = getNetWorthChartInfo(user);
  const budgetGraphData: any = getBudgetChartInfo(user);
  const debtData = getDebtChartInfo(user);
  const [
    fixedAssetsData,
    investedAssetsData,
    totalAssetsData,
    fixedOptions,
    investedOptions,
    totalOptions,
  ]: any = getAssetChartInfo(user);

  return (
    <div>
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <p className="text-center m-2">Net Worth</p>
          <Line data={netWorthGraphData} options={netWorthOptions} />
        </div>
        <div className="m-auto">
          <p className="text-center m-2">Expenses</p>
          <Doughnut data={budgetGraphData} className="flex m-auto w-50%" />
        </div>
        <div className="m-auto">
          <p className="text-center m-2">Debts</p>
          <Doughnut data={debtData} />
        </div>
      </div>
      <div className="flex container flex-col sm:flex-row">
        <p className="text-center m-2">Assets</p>
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
    </div>
  );
}
