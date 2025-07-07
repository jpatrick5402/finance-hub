"use client";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import { net_worth_history } from "@models/User";
import {
  CategoryScale,
  Chart,
  Legend,
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
      <div className="flex container text-xl">
        <p className="m-auto">Net Worth: ${net_worth}</p>
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
          <ul>
            {user.net_worth_history.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <li className="list-none">
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => {
                        setUser((prev: any) => ({
                          ...prev,
                          net_worth_history: prev.net_worth_history.map(
                            (cur: net_worth_history, i: number) =>
                              i === index
                                ? { ...cur, date: e.target.value }
                                : cur
                          ),
                        }));
                      }}
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        setUser((prev: any) => ({
                          ...prev,
                          net_worth_history: prev.net_worth_history.map(
                            (cur: net_worth_history, i: number) =>
                              i === index
                                ? { ...cur, value: e.target.value }
                                : cur
                          ),
                        }));
                      }}
                    />
                  </li>
                  <button
                    type="button"
                    className="ml-2 p-1 rounded bg-(--color-red) btn-sm pl-2 pr-2"
                    onClick={(e) => {
                      setUser((prev: any) => ({
                        ...prev,
                        net_worth_history: prev.net_worth_history.filter(
                          (_: net_worth_history, i: number) => i !== index
                        ),
                      }));
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </ul>
          <button
            className="bg-(--color-green) p-2 m-2 rounded"
            type="button"
            onClick={(e) => {
              setUser((prev: any) => ({
                ...prev,
                net_worth_history: [
                  ...prev.net_worth_history,
                  {
                    date: Date.now().toString(),
                    value: 0,
                  },
                ],
              }));
            }}
          >
            Add Data Point
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-row container">
          <div className="flex-col">
            <p className="text-2xl">Assets</p>
            <p className="text-xl">Fixed Assets</p>
            <List attribute={user.fixed_assets} />
            <p className="text-xl">Invested Assets</p>
            <List attribute={user.invested_assets} />
          </div>
        </div>
        <div className="container">
          <div className="flex-col">
            <p className="text-2xl">Debts</p>
            <List attribute={user.debts} />
          </div>
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
