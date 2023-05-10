import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "./App.css";
import { AddBuildingModal } from "./addBuildingModal";

const MapView = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [latitude, setLat] = useState(null);
  const [longitude, setLng] = useState(null);

  const { buildings } = props;

  let addModalClose = () => setAddModalShow(false);

  const onMapClick = (event) => {
    let lat = event.latLng.lat();
    let lng = event.latLng.lng();
    setLat(lat);
    setLng(lng);

    setAddModalShow(true);
  };

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new window.google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={onMapClick}
          zoom={20}
          center={{ lat: 37.33590395941839, lng: -121.87931197105083 }}
        >
          <AddBuildingModal
            lat={latitude}
            lng={longitude}
            show={addModalShow}
            onHide={addModalClose}
          />
          {buildings.map(({ building_name, lat, lng }, ind) => (
            <MarkerF
              key={ind}
              position={{ lat, lng }}
              icon={{
                url: "https://www.svgrepo.com/show/47341/cctv.svg",
                //"https://freesvg.org/img/tv_camera_sign.png",
                //url:'https://freesvg.org/img/jcartier-wireless-video-camera.png',
                scaledSize: new window.google.maps.Size(25, 25),
              }}
              // {{
              //   url: './Images/camera.png',
              //   scaledSize: new window.google.maps.Size(50, 50),
              // }}

              onClick={() => {
                handleMarkerClick(ind, lat, lng, building_name);
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
        </GoogleMap>
      )}
    </div>
  );
};

export default MapView;
