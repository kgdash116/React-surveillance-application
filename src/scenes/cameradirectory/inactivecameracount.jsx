import React, { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import CameraChart from "../../components/CameraChart";
import Header from "../../components/Header";

const InactiveCameraCount = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [numberOfInactiveCameras, setNumberOfInactiveCameras] = useState(null);

  const getCameradata = async () => {
    const response = await axios.get(
      "http://localhost:3002/v1/api/inactive-cameras"
    );
    let responsesx = response.data[0]["COUNT(*)"];

    setNumberOfInactiveCameras(responsesx);
  };
  useEffect(() => {
    getCameradata();
  }, []);
  console.log("number of incative cameras", numberOfInactiveCameras);

  return (
    // <Box

    <Typography variant="h1" fontWeight="600" color={colors.greenAccent[500]}>
      {numberOfInactiveCameras}
    </Typography>
  );
};

export default InactiveCameraCount;
