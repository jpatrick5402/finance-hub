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
import { getDebtChartInfo } from "@lib/chartData";

Chart.register(ArcElement, Tooltip);

export default function Debts() {
  const [user, setUser] = useContext(UserContext);

  const debtData = getDebtChartInfo(user);

  return (
    <Form
      action={async () => {
        await setData(user);
        location.reload();
      }}
    >
      <div className="flex container">
        <div className="m-auto flex flex-row">
          <InfoIcon infoText="A combined total of all debts" />
          <p className="text-2xl">
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
