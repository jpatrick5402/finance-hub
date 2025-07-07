"use client";
import List from "@components/List";
import SaveButton from "@components/SaveButton";
import UserContext from "@contexts/UserContext";
import { setData } from "@lib/data";
import { ArcElement, Chart, Tooltip } from "chart.js";
import Form from "next/form";
import { useContext } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

export default function NetWorth() {
  const [user, setUser] = useContext(UserContext);

  // --- Chart Data ---

  const fixedAssetsData = {
    labels: user.fixed_assets
      .filter((asset) => asset.interest === 0)
      .map((asset) => asset.name),
    datasets: [
      {
        label: "Value $",
        data: user.fixed_assets
          .filter((asset) => asset.interest === 0)
          .map((asset) => asset.value),
      },
    ],
  };
  const investedAssetsData = {
    labels: user.invested_assets
      .filter((asset) => asset.interest > 0)
      .map((asset) => asset.name),
    datasets: [
      {
        label: "Value $",
        data: user.invested_assets
          .filter((asset) => asset.interest > 0)
          .map((asset) => asset.value),
      },
    ],
  };
  const totalAssetsData = {
    labels: [
      user.fixed_assets.map((asset) => asset.name),
      user.invested_assets.map((asset) => asset.name),
    ],
    datasets: [
      {
        label: "Value $",
        data: [
          user.fixed_assets.map((asset) => asset.value),
          user.invested_assets.map((asset) => asset.value),
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
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut
            data={fixedAssetsData}
            options={{
              plugins: {
                title: { display: true, text: "Fixed", color: "#FFFFFF" },
              },
            }}
          />
        </div>
        <div className="m-auto">
          <Doughnut
            data={investedAssetsData}
            options={{
              plugins: {
                title: { display: true, text: "Invested", color: "#FFFFFF" },
              },
            }}
          />
        </div>
        <div className="m-auto">
          <Doughnut
            data={totalAssetsData}
            options={{
              plugins: {
                title: { display: true, text: "Total", color: "#FFFFFF" },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="container">
          <List attribute={user.fixed_assets} />
        </div>
        <div className="flex container">
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
