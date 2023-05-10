import React from "react";
import { Typography } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Thank you for your payment!
      </Typography>
    </div>
  );
};

export default PaymentSuccess;
