import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mockBarData = [
    {
      building: "Clark",
      Arson: 137,
      arsonColor: "hsl(229, 70%, 50%)",
      Accident: 96,
      accidentColor: "hsl(296, 70%, 50%)",
      Dumping: 72,
      dumpingColor: "hsl(97, 70%, 50%)",
    },
    {
      building: "Parking-1",
      Arson: 55,
      arsonColor: "hsl(307, 70%, 50%)",
      Accident: 28,
      accidentColor: "hsl(111, 70%, 50%)",
      Dumping: 58,
      dumpingColor: "hsl(273, 70%, 50%)",
    },
    {
      building: "Student Union",
      Arson: 109,
      arsonColor: "hsl(72, 70%, 50%)",
      Accident: 23,
      accidentColor: "hsl(96, 70%, 50%)",
      Dumping: 34,
      dumpingColor: "hsl(106, 70%, 50%)",
    },
    {
      building: "ENG",
      Arson: 133,
      arsonColor: "hsl(257, 70%, 50%)",
      Accident: 52,
      accidentColor: "hsl(326, 70%, 50%)",
      Dumping: 43,
      dumpingColor: "hsl(110, 70%, 50%)",
    },
    {
      building: "CV1",
      Arson: 81,
      arsonColor: "hsl(190, 70%, 50%)",
      Accident: 80,
      accidentColor: "hsl(325, 70%, 50%)",
      Dumping: 112,
      dumpingColor: "hsl(54, 70%, 50%)",
    },
    {
      building: "CV2",
      Arson: 66,
      arsonColor: "hsl(208, 70%, 50%)",
      Accident: 111,
      accidentColor: "hsl(334, 70%, 50%)",
      Dumping: 27,
      dumpingColor: "hsl(182, 70%, 50%)",
    },
    {
      building: "Staffroom",
      Arson: 80,
      arsonColor: "hsl(87, 70%, 50%)",
      Accident: 47,
      accidentColor: "hsl(141, 70%, 50%)",
      Dumping: 158,
      dumpingColor: "hsl(224, 70%, 50%)",
    },
  ];
  return (
    <ResponsiveBar
      data={mockBarData}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      keys={["Arson", "Dumping", "Accident"]}
      indexBy="building"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Building", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "total alerts", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
