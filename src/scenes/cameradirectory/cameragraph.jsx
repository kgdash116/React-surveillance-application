import { Box } from "@mui/material";
import Header from "../../components/Header";
import CameraChart from "../../components/CameraChart";

const CameraPie = () => {
  return (
    <Box m="20px">
      <Header
        title="Camera Chart"
        subtitle="A display of active and inactive cameras"
      />
      <Box height="70vh">
        <CameraChart />
      </Box>
    </Box>
  );
};

export default CameraPie;
