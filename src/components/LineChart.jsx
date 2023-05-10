import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mockLineData = [
    {
      id: "Dumping",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: "Jan",
          y: 2,
        },
        {
          x: "Feb",
          y: 5,
        },
        {
          x: "Mar",
          y: 3,
        },
        {
          x: "Apr",
          y: 3,
        },
        {
          x: "May",
          y: 2,
        },
        {
          x: "June",
          y: 6,
        },
        {
          x: "July",
          y: 5,
        },
        {
          x: "Aug",
          y: 2,
        },
        {
          x: "Sep",
          y: 1,
        },
        {
          x: "Oct",
          y: 6,
        },
        {
          x: "Nov",
          y: 3,
        },
        {
          x: "Dec",
          y: 4,
        },
      ],
    },
    {
      id: "Auto Accident",
      color: tokens("dark").blueAccent[300],
      data: [
        {
          x: "Jan",
          y: 3,
        },
        {
          x: "Feb",
          y: 2,
        },
        {
          x: "Mar",
          y: 5,
        },
        {
          x: "Apr",
          y: 1,
        },
        {
          x: "May",
          y: 2,
        },
        {
          x: "June",
          y: 6,
        },
        {
          x: "July",
          y: 1,
        },
        {
          x: "Aug",
          y: 2,
        },
        {
          x: "Sep",
          y: 2,
        },
        {
          x: "Oct",
          y: 4,
        },
        {
          x: "Nov",
          y: 3,
        },
        {
          x: "Dec",
          y: 1,
        },
      ],
    },
    {
      id: "Arson",
      color: tokens("dark").redAccent[200],
      data: [
        {
          x: "Jan",
          y: 1,
        },
        {
          x: "Feb",
          y: 3,
        },
        {
          x: "Mar",
          y: 3,
        },
        {
          x: "Apr",
          y: 2,
        },
        {
          x: "May",
          y: 4,
        },
        {
          x: "June",
          y: 5,
        },
        {
          x: "July",
          y: 5,
        },
        {
          x: "Aug",
          y: 2,
        },
        {
          x: "Sep",
          y: 1,
        },
        {
          x: "Oct",
          y: 4,
        },
        {
          x: "Nov",
          y: 3,
        },
        {
          x: "Dec",
          y: 4,
        },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={mockLineData}
      theme={{
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
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Alerts", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
