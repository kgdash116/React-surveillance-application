import React, { useContext, useEffect, useState } from "react";
import { Button, Box, InputBase, Typography } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "./paymentSuccess";

const Billing = () => {
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(colorMode);
  const navigate = useNavigate();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    if (showPaymentSuccess) {
      navigate("/payment-success");
    }
  }, [showPaymentSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("http://localhost:3002/v1/api/billing", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: 1,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setShowPaymentSuccess(true);
        },
        (error) => {
          console.log("Some error occurred!!");
        }
      );
  };

  if (showPaymentSuccess) {
    return <PaymentSuccess />;
  }

  return (
    <div>
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Billing Information
      </Typography>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          maxWidth="50%"
          justifyContent="center"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000000" }}
            placeholder="Name on Card"
            required
          />
        </Box>
        <br />
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          maxWidth="50%"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000000" }}
            placeholder="Card Number"
            required
          />
        </Box>
        <br />
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          maxWidth="50%"
          align="center"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000000" }}
            placeholder="Expiration Date"
            required
          />
        </Box>
        <br />
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          maxWidth="50%"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "#000000" }}
            placeholder="CVV"
            required
          />
        </Box>
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          align="center"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Billing;
