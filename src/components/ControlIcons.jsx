import React from "react";
import "./ControlIcons.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ControlIcons = () => {
  return (
    <div className="controls__div">
      {/* Top Segment */}
      <Grid>
        <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            Player
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlIcons;
