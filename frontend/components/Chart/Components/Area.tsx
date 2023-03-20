import React, { useContext, useMemo } from "react";
import { AxisOptions } from "react-charts";
import { ThemeContext } from "@/context";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});
// const Chart = dynamic(() => import("react-charts"), { ssr: false });
// const Chart = useMemo(() => dynamic(
//   () => import('react-charts').then(re => re.Chart),
//   { ssr: false }
// ), []);

function Area({ chartData }) {
  const { isDarkMode } = useContext(ThemeContext);

  const primaryAxis = React.useMemo<
    AxisOptions<typeof chartData["data"][number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof chartData["data"][number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.params,
        // stacked: true, // thats columns
        // OR
        elementType: "area",
      },
    ],
    []
  );

  return (
    <>
      <Chart
        options={{
          data: chartData,
          primaryAxis,
          secondaryAxes,
          dark: isDarkMode,
        }}
      />
    </>
  );
}

export default Area;
