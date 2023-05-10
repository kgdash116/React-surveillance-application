import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";

const CameraChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inactive, setInActive] = useState(null);
  const [active, setActive] = useState(null);
  const [cameraData, setCameraData] = useState([]);

  const getActiveInactiveCameraData = async () => {
    const response = await axios.get(
      "http://localhost:3002/v1/api/inactive-active-cameras"
    );
    //let responsesx = response.data[0]["COUNT(*)"];
    console.log(response.data[0]["count_of_zeros"]);
    // setInActive(response.data[0]["count_of_zeros"]);
    //setActive(responsesx);
    setCameraData([
      {
        id: "Inactive",
        label: "Inactive",
        value: response.data[0]["count_of_zeros"],
      },
      {
        id: "Active",
        label: "Active",
        value: response.data[0]["count_of_ones"],
      },
    ]);
  };

  useEffect(() => {
    getActiveInactiveCameraData();
  }, []);

  //   useEffect(() => {
  //     getInactiveCameraData();
  //     getActiveCameraData();
  //     setData([
  //         { id: "Admin", label: "Adminsitrators", value: adminCount },
  //         { id: "Staff", label: "Staff", value: nonAdminCount },
  //       ]);
  //   }, []);

  //   console.log("number of active cameras", active);
  //   console.log("number of inactive cameras", inactive);

  return (
    <ResponsivePie
      data={cameraData}
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
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "paired" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 20]],
        fontSize: "50px",
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 8,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={
        isDashboard
          ? []
          : [
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 10,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

export default CameraChart;
