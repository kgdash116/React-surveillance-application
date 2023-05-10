import React from 'react';
import { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Table, {SelectColumnFilter, StatusPill} from "./Table";
import Button from "@mui/material/Button";
import { tokens } from "../../theme"
import { useTheme } from "@mui/material";

import {AddCameraModal} from './addCameraModal';
import {ViewModal} from './viewModal';

import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const FloorDirectory = (props) => {
    const [cameras, setCameras] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [checkFlag, setCheckFlag] = useState(false);
	let navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const buildingName = location.state.building_name;

    useEffect(() => {
		getFloorData(buildingName);
	}, []);

    const [addModalShow, setAddModalShow] = useState(false);
    let addModalClose =() => setAddModalShow(false);

    const [viewModalShow, setViewModalShow] = useState(false);
    let viewModalClose =() => setViewModalShow(false);
    
    
    const getFloorData = async (buildingName) => {
		const response = await axios.get('http://localhost:3002/v1/api/floor-detail', {
            params: { buildingName: buildingName }},);
		setCameras(response.data);
        const resp = await axios.get('http://localhost:3002/v1/api/user-detail', {
            params: { user_id: "1" }},);
        let cams = [];
        resp.data.forEach((entry) => {
            cams.push(entry.camera_id);
        });
        setUserInfo(cams);
	};
    /*
    const getFloorData = (buildingName) => {
		axios.get('http://localhost:3002/v1/api/floor-detail', {
            params: { buildingName: buildingName }},).then(
                res => {
                    axios.get('http://localhost:3002/v1/api/user-detail', {params: { user_id: "1" }},).then(
                        response => {
                            let cams = [];
                            console.log(response.data);
                            response.data.forEach((entry) => {
                                cams.push(entry.camera_id);
                            });
                            setUserInfo(cams);
                            setCameras(res.data);
                            setCheckFlag(true);
                        }
                    );
                }
            );
	};*/

    function getButton(userInfo, value) {
        if(userInfo.indexOf(JSON.stringify(value)) > -1) {
            return (<Button variant="outlined" show={checkFlag} onClick={() =>deleteCamera(value)}>Delete</Button>);
        }
        else {
            return (<Button variant="contained" show={checkFlag} onClick={() =>addCamera(value)}>Add</Button>);
        }
    }

    function getModal() {
          return( <div>
                 <Button
    				variant='primary'
   				 	onClick={()=> {
                        setViewModalShow(true);
                        console.log("Hello");
					   //setViewModalShow(true);
					}} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}
   					>View</Button>
					<ViewModal
                    buildingName={buildingName}
					show={viewModalShow}
					onHide={viewModalClose}
					/>
             </div>)
    }

    function deleteCamera(value) {
        //console.log(value);
    }
    function delete_camera(value){
        const resp = axios.delete(`http://localhost:3002/v1/api/delete_camera/${value}`).then(
            resp => {
                if(resp.status==200) {
                    window.location.reload();
                }
                else {
                    alert("Please Try again");
                }
            }
            );

    }


    async function addCamera(value) {
        const data = { user_id: "1", camera_id: JSON.stringify(value) };
        const resp = await axios.post('http://localhost:3002/v1/api/user-detail', data);
        if(resp.status==200) {
            window.location.reload();
        }
        else {
            alert("Please Try again");
        }
    }

    const columns = React.useMemo(() => [
        {
            Header: "Camera Name",
            accessor: "camera_name"
        },
        {
            Header: "Camera Location",
            accessor: "camera_loc"
        },
        {
            Header: "Status",
            accessor: "network_state",
            Cell: StatusPill,
        },
        {
            Header: "Floor",
            accessor: "floor_num",
            Filter: SelectColumnFilter,
            filter: 'indexOf'
        },
        // {
        //     Header: "Building",
        //     accessor: "building_name"
        // },
        {
            Header: "Date of Installation",
            //accessor: "date_of_installation"
            accessor: row => new Date(row.date_of_installation).toLocaleDateString()
        },
        // {
        //     Header: "Action",
        //     accessor: "camera_id",
        //     Cell: ({value}) => (
        //         getButton(userInfo, value)
        //         // <div>
        //         // {
        //         // userInfo.includes(JSON.stringify(value)) ? 
        //         // <Button variant="outlined" onClick={() =>deleteCamera(value)}>Delete</Button> :
        //         // <Button variant="contained" onClick={() =>addCamera(value)}>Add</Button>
        //         // }
        //         // </div>
        //         )
        // },
        {
            Header: "Alert Analysis",
            //accessor: "camera_id",
            // Cell: ({value}) => (
            //     <div>
            //     {/* <Button variant="contained" color="primary" onClick={() => alert("Button clicked")} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}>Add camera</Button> */}
            //     <Button
    		// 		variant='primary'
   			// 	 	onClick={()=> {
            //             setViewModalShow(true);
            //             console.log("Hello");
			// 		   //setViewModalShow(true);
			// 		}} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}
   			// 		>View</Button>
			// 		<ViewModal
            //         buildingName={buildingName}
			// 		show={viewModalShow}
			// 		onHide={viewModalClose}
			// 		/>
            //      </div>
            // )
            Cell: ({value}) => (getModal())
            
        },
        {
            Header: "Delete",
            accessor: "camera_id",
            //Cell: ({value}) => (<Button onClick={() => delete_camera(value)} style={{ backgroundColor: colors.redAccent[500], color: 'white' }}>Delete</Button>)
            Cell: ({value}) => (
                <IconButton onClick={() => delete_camera(value)} aria-label="delete">
                  <Delete style={{ color: 'red' }}/>
                </IconButton>
              )
        },

    ], []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="mt-4">
                <div className="mt-4" style={{ textAlign: "right" }}>
                {/* <Button variant="contained" color="primary" onClick={() => alert("Button clicked")} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}>Add camera</Button> */}
                <Button
    				variant='primary'
   				 	onClick={()=> {
						setAddModalShow(true);
					}} style={{ backgroundColor: colors.greenAccent[500], color: 'white' }}
   					>Add Camera</Button>
					<AddCameraModal
                    buildingName={buildingName}
					show={addModalShow}
					onHide={addModalClose}
					/>
                 </div>
                <Table columns={columns} data={cameras} />
                <Button
    				variant='primary'
   				 	onClick={()=> {
                        setViewModalShow(true);
                        console.log("Hello");
					   //setViewModalShow(true);
					}} style={{ backgroundColor: colors.greenAccent[500], color: 'white',display: "none"  }}
   					>Alerts</Button>
					<ViewModal
                    buildingName={buildingName}
					show={viewModalShow}
					onHide={viewModalClose}
					/>
                
                </div>    
            </main>
        </div>
       
    );
};

export default FloorDirectory;