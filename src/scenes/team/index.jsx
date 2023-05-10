import {
  InputBase,
  Paper,
  IconButton,
  Box,
  Typography,
  useTheme,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { tokens } from "../../theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import { DataGrid } from "@mui/x-data-grid";

import Header from "../../components/Header";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [credentials, setCredentials] = useState("");
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const [visible, setVisible] = useState(false);
  const [numberOfCameras, setNumberOfCameras] = useState(null);

  const initialValues = {
    userName: username,
    email: email,
    password: password,
    admin: isAdmin,
  };

  useEffect(() => {
    async function getCurrentCredentials() {
      try {
        const credentials = await Auth.currentUserInfo();
        setCredentials(credentials);
        const adminStatus = credentials.attributes["custom:admin"];
        setIsCurrentUserAdmin(adminStatus);
      } catch (error) {
        console.log("Error getting current credentials:", error);
      }
    }
    getCurrentCredentials();
  }, []);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleSubmit = async (event) => {
    if (isCurrentUserAdmin === "true") {
      event.preventDefault();

      try {
        const attributes = {
          email,
          "custom:admin": isAdmin ? "true" : "false", // include the 'admin' custom attribute
        };
        const result = await Auth.signUp({
          username: username,
          password,
          attributes,
        });
        console.log("Sign up result:", result);
        alert("User added successfully!");
        window.location.reload(false);
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Error adding user. Please try again.");
      }
    } else {
      console.log("Only Admininstrators can add new users");
      alert("Only Admininstrators can add new users");
    }
  };

  return (
    <Box m="20px">
      {/* <Header title="CREATE USER" subtitle="Add a New User " /> */}
      <Box
        display="flex"
        gridColumn="span 12"
        //justifyContent="space-between"
        justifyContent="center"
        backgroundColor={colors.blueAccent[700]}
        alignItems="center"
        borderBottom={`2px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h3" fontWeight="600">
          Add Users
        </Typography>
      </Box>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Box
          display="-webkit-flex"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="User Name"
            onChange={handleUserNameChange}
            value={username}
            name="username"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            onChange={handleEmailChange}
            value={email}
            name="email"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type={visible ? "text" : "password"}
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            sx={{ gridColumn: "span 2" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisible(!visible)}>
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* <TextField
                 
                  //variant="filled"
                  type="checkbox"
                  label="Admin"
                  onBlur={handleBlur}
                  onChange={handleAdminChange}
                  value={isAdmin}
                  name="admin"
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                  sx={{ gridColumn: "span 1" }}
                /> */}
          <FormControlLabel
            control={
              <Switch
                color="success"
                size="normal"
                checked={isAdmin}
                onChange={handleAdminChange}
                sx={{ gridColumn: "span 2" }}
              />
            }
            label="Admin"
          />
        </Box>
        <Box display="flex" justifyContent="center" mt="60px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Team;

const schema = yup.object().shape({
  userName: yup.string().required("required"),

  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
