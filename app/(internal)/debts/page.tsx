"use client";
import UserContext from "@contexts/UserContext";
import { useContext } from "react";
import List from "@components/List";
import Form from "next/form";
import { setData } from "@lib/data";
import SaveButton from "@components/SaveButton";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip } from "chart.js";
import InfoIcon from "@components/InfoIcon";
import { reductionParse } from "@lib/reductionParse";

Chart.register(ArcElement, Tooltip);

export default function Debts() {
  const [user, setUser] = useContext(UserContext);

  const activeDebt = user.debts.filter((debt: any) => debt.active);
  // -- chart data --
  const debtData = {
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

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="flex container">
        <p className="text-2xl m-auto flex flex-row">
          <InfoIcon infoText="A combined total of all debts" />
          Total Debts: $
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
      <div className="flex container flex-col sm:flex-row">
        <div className="m-auto">
          <Doughnut data={debtData} />
        </div>
        <div className="m-auto">
          <List
            attributeList={user.debts}
            columnList={["name", "value", "interest", "category"]}
          />
        </div>
      </div>
      <SaveButton />
    </Form>
  );
}
