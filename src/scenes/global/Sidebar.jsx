import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";
import FileIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Billing from "../billing/billing";

import { Auth } from "aws-amplify";
import { ColorLensOutlined } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [credentials, setCredentials] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [EmployeeClearnece, setEmployeeClearnece] = useState("");
  const [currentUsername, setCurrentUsername] = useState("Loading...");

  useEffect(() => {
    async function getCurrentCredentials() {
      try {
        const theseCredentials = await Auth.currentUserInfo();
        setCredentials(theseCredentials);
        const adminStatus = theseCredentials.attributes["custom:admin"];
        setIsAdmin(adminStatus);
        console.log("The admin status is given as", adminStatus);
        if (adminStatus === "false") {
          setEmployeeClearnece("Staff");
        } else {
          setEmployeeClearnece("Admin");
        }
        setCurrentUsername(theseCredentials.username);
      } catch (error) {
        console.log("Error getting current credentials:", error);
      }
    }
    getCurrentCredentials();
  }, []);

  //   var result;
  //   Auth.currentAuthenticatedUser().then((user) => {
  //     console.log('user email = ' + user.username);
  //     result=9;
  //     console.log('r' + result)

  //   });

  //   async function myFunction(){
  //     const result= await Auth.currentAuthenticatedUser().then((user) =>
  //      {return (user.username)});

  //      //console.log(result);
  //     let final_data = JSON.stringify(result);

  //     console.log(final_data);
  //     return {final_data};
  //   }
  //   const xyz=  myFunction();
  //   console.log(xyz);

  // const x= Auth.currentUserInfo();
  // console.log(x)
  // let x;
  // Auth.currentUserInfo().then((userInfo) => {
  //     const { attributes = {} } = userInfo;
  //     console.log(attributes['email']);
  //     setUserName=attributes['email'];
  //   })

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: "1350px",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Guard Up
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                
              </Box> */}
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {currentUsername}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {EmployeeClearnece}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              User Data
            </Typography>
            <Item
              title="Add Users"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Camera Management
            </Typography>
            <Item
              title="Camera Directory"
              to="/buildingInfo"
              icon={<FileIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Files"
              to="/manageFiles"
              icon={<VideocamIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Camera Chart"
              to="/cameracounts"
              icon={<CameraAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Billing"
              to="/billing"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts and metrics
            </Typography>
            <Item
              title="Building Alerts"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Accumulated Alerts"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
