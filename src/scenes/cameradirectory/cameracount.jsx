import React, { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const CameraCount = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [numberOfCameras, setNumberOfCameras] = useState(null);

  const getCameradata = async () => {
    const response = await axios.get(
      "http://localhost:3002/v1/api/camera-detail"
    );
    let responsesx = response.data[0]["COUNT(*)"];

    setNumberOfCameras(responsesx);
  };
  useEffect(() => {
    getCameradata();
  }, []);
  // console.log("CAMERA COUNT", numberOfCameras);

  return (
    // <Box
    //   justifyContent="center"
    //   alignItems="center"
    //   backgroundColor={colors.primary[400]}
    // >

    <Typography variant="h1" fontWeight="600" color={colors.greenAccent[500]}>
      {numberOfCameras}
    </Typography>
  );
};

export default CameraCount;
