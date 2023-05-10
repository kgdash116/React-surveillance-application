import React, { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const Totalbuildings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [numberOfBuildings, setNumberOfBuildings] = useState(null);

  const getBuildingData = async () => {
    const response = await axios.get(
      "http://localhost:3002/v1/api/building-count"
    );
    let responsesx = response.data[0]["COUNT(*)"];

    setNumberOfBuildings(responsesx);
  };
  useEffect(() => {
    getBuildingData();
  }, []);
  //console.log("number of buildings", numberOfBuildings);

  return (
    // <Box

    <Typography variant="h1" fontWeight="600" color={colors.greenAccent[500]}>
      {numberOfBuildings}
    </Typography>
  );
};

export default Totalbuildings;
