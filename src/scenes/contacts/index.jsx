import React, { useEffect, useState } from "react";
import { Auth } from "@aws-amplify/auth";
import Header from "../../components/Header";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Team from "../team";
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

function Contacts() {
  const theme = useTheme();
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const REGION = process.env.REACT_APP_AWS_REGION;
  const cognitoClient = new CognitoIdentityProviderClient({
    region: REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    },
  });
  const listUsers = async () => {
    try {
      const data = await cognitoClient.send(
        new ListUsersCommand({ UserPoolId: "us-east-1_yZDcfnqL2" })
      );
      const usersWithIds = data.Users.map((user, index) => ({
        id: index + 1,
        username: user.Username,
        email: user.Attributes.find((attr) => attr.Name === "email").Value,
        status: user.UserStatus,
        isAdmin:
          user.Attributes.find((attr) => attr.Name === "custom:admin").Value ===
          "true"
            ? "Admin"
            : "Staff",
      }));
      setUsers(usersWithIds);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getCurrentCredentials() {
      try {
        const credentials = await Auth.currentUserInfo();

        const adminStatus = credentials.attributes["custom:admin"];
        console.log("Admin status", adminStatus);
        setIsCurrentUserAdmin(adminStatus);
      } catch (error) {
        console.log("Error getting current credentials:", error);
      }
    }
    getCurrentCredentials();
  }, []);

  useEffect(() => {
    listUsers();
  }, []);

  const handleClick = async (event, cellproperties) => {
    if (isCurrentUserAdmin === "true") {
      event.preventDefault();

      try {
        const params = {
          UserPoolId: process.env.REACT_APP_USER_POOL_ID, // Replace with your user pool ID
          Username: cellproperties.row.username,
        };

        const command = new AdminDeleteUserCommand(params);
        const response = await cognitoClient.send(command);
        console.log(response);
        alert("user deleted successfully");
        window.location.reload(false);
      } catch (err) {
        console.log("Error deleting user:", err);
      }
    } else {
      console.log("You are logged in as", isCurrentUserAdmin); //can del
      console.log("Only Admininstrators can delete users");
      alert("Only Admininstrators can delete users");
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "status",
      headerName: "User Status",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Access Level",
      flex: 0.5,
      renderCell: ({ row: { isAdmin } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin === "Admin"
                ? colors.greenAccent[600]
                : colors.blueAccent[700]
            }
            borderRadius="4px"
          >
            {isAdmin === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {isAdmin === "Staff" && <SecurityOutlinedIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {isAdmin}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogContent>
                <DialogContentText>
                  {" "}
                  Are you sure you want to delete this user ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="warning">
                  Cancel
                </Button>
                <Button
                  onClick={(event) => {
                    handleClick(event, cellValues);
                    setOpen(false);
                  }}
                  color="error"
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Users" subtitle="Managing the Team Members" />
      <Team />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>
    </Box>
  );
}

export default Contacts;
