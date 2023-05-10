import {
  Box,
  useTheme,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Header from "../../components/Header";
import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MapView from "./mapView";
import axios from "axios";
import "./style.css";
import "./App.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { AddBuildingModal } from "./addBuildingModal";
import { IconButton } from "@mui/material";
import { BorderColor, Map } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const BuildingDirectory = (props) => {
  const theme = useTheme();

  const [buildings, setBuildings] = useState([]);
  let navigate = useNavigate();
  const [addModalShow, setAddModalShow] = useState(false);
  const colors = tokens(theme.palette.mode);

  function ItemTemplate(data) {
    const textColor =
      theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)";
    const backgroundColor = theme.palette.mode === "dark" ? "#141b2d" : "#fff";

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //backgroundColor,
          color: textColor,
        }}
        onClick={() =>
          navigate("/floorInfo", {
            state: { building_name: data.building_name },
          })
        }
      >
        <span>{data.building_name}</span>
        <NavigateNextIcon
          onClick={() =>
            navigate("/floorInfo", {
              state: { building_name: data.building_name },
            })
          }
        />
        {/* <Button
          variant="contained"
          color="error"
          onClick={() => console.log("Delete button clicked")}
        >
          Delete
        </Button> */}
      </div>
    );
  }

  useEffect(() => {
    getBuildingData();
  }, []);

  const getBuildingData = async () => {
    const response = await axios.get(
      "http://localhost:3002/v1/api/building-details"
    );
    setBuildings(response.data);
  };

  let addModalClose = () => setAddModalShow(false);

  const handleClick = () => {
    navigate("/mapView");
  };

  const onItemDeleting = (e) => {
    const itemData = e.itemData;
    const itemDomNode = e.itemElement;
    const itemIndex = e.itemIndex;
    alert("delete pressed");
    // Handler of the "itemDeleting" event
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Building Directory" subtitle="Building Management" />

        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          {/* <IconButton
            onClick={handleClick}
            style={{
              backgroundColor: colors.greenAccent[500],
              color: "white",
            }}
          >
            <Map />
          </IconButton> */}
          <IconButton
            onClick={() => setAddModalShow(true)}
            sx={{
              bgcolor: colors.greenAccent[500],
              color: "white",
              marginLeft: "10px",
            }}
          >
            <AddIcon />
          </IconButton>
          <AddBuildingModal show={addModalShow} onHide={addModalClose} />
        </Box>
      </Box>
      {/* <Button
    				variant='secondary'
   				 	onClick={handleClick} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}
   					>Map View</Button> */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="10px"
      >
        <Box
          display="flex"
          gridColumn="span 12"
          //justifyContent="space-between"
          justifyContent="center"
          backgroundColor={colors.primary[400]}
          alignItems="center"
          borderBottom={`2px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h3" fontWeight="600">
            Camera Zones
          </Typography>
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <List>
            {buildings.map((transaction, i) => (
              <ListItem
                key={`${transaction.building_name}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`8px solid ${colors.primary[500]}`}
                p="15px"
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon
                    // onClick={console.log("You just pressed a delete button")}
                    />
                  </IconButton>
                }
              >
                <ApartmentIcon
                  sx={{
                    //bgcolor: colors.greenAccent[500],
                    color: "white",
                    marginRight: "20px",
                  }}
                />
                <ListItemButton
                  onClick={() =>
                    navigate("/floorInfo", {
                      state: { building_name: transaction.building_name },
                    })
                  }
                >
                  <ListItemText
                    primary={
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h4" // changed to h4
                        fontWeight="600"
                      >
                        {transaction.building_name}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          display="flex"
          gridColumn="span 12"
          //justifyContent="space-between"
          justifyContent="center"
          backgroundColor={colors.primary[400]}
          alignItems="center"
          borderBottom={`2px solid ${colors.primary[500]}`}
          colors={colors.grey[100]}
          p="15px"
        >
          <Typography color={colors.grey[100]} variant="h3" fontWeight="600">
            Map view
          </Typography>
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box>
            {/* <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {markers.map(({ address, lat, lng }, ind) => (
              <MarkerF
                key={ind}
                position={{ lat, lng }}
                icon={{
                  //url: 'https://freesvg.org/img/1499683972.png',
                  url: "https://freesvg.org/img/tv_camera_sign.png",
                  //url:'https://freesvg.org/img/jcartier-wireless-video-camera.png',
                  scaledSize: new window.google.maps.Size(25, 25),
                }}
                // {{
                //   url: './Images/camera.png',
                //   scaledSize: new window.google.maps.Size(50, 50),
                // }}

                onClick={() => {
                  handleMarkerClick(ind, lat, lng, address);
                }}
              >
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    {
                      <h6 style={{ color: "#6870fa" }}>
                        {infoWindowData.address}
                      </h6>
                    }
                  </InfoWindow>
                )}
              </MarkerF>
            ))}
          </GoogleMap> */}
            <MapView buildings={buildings} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BuildingDirectory;
