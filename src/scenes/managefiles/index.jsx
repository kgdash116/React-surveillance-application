import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import screenfull from "screenfull";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  } else {
    return `${mm}:${ss}`;
  }
};

const ManageFiles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const axios = require('axios');
  //Destructure State in other to get the values in it
  const [playerstate, setPlayerState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playerbackRate: 1.0,
    played: 0,
    seeking: false,
  });
  const { playing, muted, volume, playerbackRate, played, seeking } =
    playerstate;
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);

  //This function handles play and pause onchange button
  const handlePlayAndPause = () => {
    setPlayerState({ ...playerstate, playing: !playerstate.playing });
  };

  const handleMuting = () => {
    setPlayerState({ ...playerstate, muted: !playerstate.muted });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30);
  };

  const handleVolumeChange = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeek = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlayerRate = (rate) => {
    setPlayerState({ ...playerstate, playerbackRate: rate });
  };

  const handleFullScreenMode = () => {
    screenfull.toggle(playerDivRef.current);
  };

  const handlePlayerProgress = (state) => {
    console.log("onProgress", state);
    if (!playerstate.seeking) {
      setPlayerState({ ...playerstate, ...state });
    }
    console.log("afterProgress", state);
  };

  const handlePlayerSeek = (e, newValue) => {
    setPlayerState({ ...playerstate, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(parseFloat(newValue / 100));
    // console.log(played)
  };

  const handlePlayerMouseSeekDown = (e) => {
    setPlayerState({ ...playerstate, seeking: true });
  };

  const handlePlayerMouseSeekUp = (e, newValue) => {
    setPlayerState({ ...playerstate, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const currentPlayerTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const movieDuration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const playedTime = format(currentPlayerTime);
  const fullMovieTime = format(movieDuration);

  const downloadfile = (filename) => {
    var thisurl =
      "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/file";
    thisurl = thisurl + "?filename=" + filename;
    axios({ url: thisurl, method: "GET" }).then((response) => {
      console.log(response);
      // fetch(response.data).then(response=>response.blob()).then(blob=>{
      //   const blobURL = window.URL.createObjectURL(new Blob([blob]));
      //   const aTag = document.createElement("a");
      //   aTag.href = blobURL;
      //   document.body.appendChild(aTag);
      //   aTag.click();
      //   aTag.remove();
      // })
      const aTag = document.createElement("a");
      aTag.href = response.data;
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    });
  };
  const [videourl, setVideo] = useState([]);

  const playfile = (filename) => {
    var thisurl =
      "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/file";
    thisurl = thisurl + "?filename=" + filename;
    axios({ url: thisurl, method: "GET" }).then((response) => {
      // setVideo(response.data);
      console.log(response);
      const aTag = document.createElement("a");
      aTag.href = response.data;
      document.body.appendChild(aTag);
      setVideo(aTag);
      // aTag.click();
      // aTag.remove();
    });
  };

  const deletefile = (filename) => {
    const choice = window.confirm("Are you sure to delete this file?");
    if (choice) {
      var thisurl =
        "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/file";
      thisurl = thisurl + "?filename=" + filename;
      axios({ url: thisurl, method: "DELETE" }).then((response) => {
        console.log(response.data);
        window.location.reload(false);
      });
    }
  };

  const columns = [
    {
      field: "Key",
      headerName: "File Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Size",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "LastModified",
      headerName: "Date",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Play",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: ({ row: { Key } }) => {
        return (
          <Button
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            onClick={() => playfile(Key)}
          >
            <Typography color={colors.greenAccent[100]} sx={{ ml: "5px" }}>
              {"Play"}
            </Typography>
          </Button>

          // <Button
          //   width="60%"
          //   m="0 auto"
          //   p="5px"
          //   display="flex"
          //   onClick={() => downloadfile(Key)}
          // >
          //   <Typography color={colors.greenAccent[100]} sx={{ ml: "5px" }}>
          //     {"Download"}
          //   </Typography>
          // </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: ({ row: { Key } }) => {
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => deletefile(Key)}
          >
            Delete
          </Button>

          // <Button
          //   width="60%"
          //   m="0 auto"
          //   p="5px"
          //   display="flex"
          //   onClick={() => deletefile(Key)}
          // >
          //   <Typography color={colors.redAccent[300]} sx={{ ml: "5px" }}>
          //     {"DELETE"}
          //   </Typography>
          // </Button>
        );
      },
    },
  ];

  // axios.get('https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/files')
  //   .then(response => {
  //     console.log(response.data);
  //     data = response.data;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  const url =
    "https://booeg3cke4.execute-api.us-east-1.amazonaws.com/test/files";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  const [value, onChange] = useState(new Date());

  return (
    <Box m="40px">
      <Header title="File System" subtitle="Managing the Files" />
      <Box
        m="20px 0 0 0"
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
        <DataGrid rows={data} columns={columns} />
        <ReactPlayer
          width={"50%"}
          height="50%"
          ref={playerRef}
          url={videourl}
          playing={playing}
          volume={volume}
          playbackRate={playerbackRate}
          onProgress={handlePlayerProgress}
          controls
          loop
          muted={muted}
          onError={() => console.log("onError callback")}
        />
      </Box>
    </Box>
  );
};

export default ManageFiles;
