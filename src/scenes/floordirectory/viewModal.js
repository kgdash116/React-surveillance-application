import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

import { LineChart, Line, XAxis, YAxis, CartesianGrid,Legend, BarChart, Bar,AreaChart, Area,Tooltip} from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'Jan', alerts: 50 },
    { name: 'Feb', alerts: 60 },
    { name: 'Mar', alerts: 80 },
    { name: 'Apr', alerts: 70 },
    { name: 'May', alerts: 90 },
    { name: 'Jun', alerts: 120 },
    { name: 'Jul', alerts: 100 },
    { name: 'Aug', alerts: 110 },
    { name: 'Sep', alerts: 95 },
    { name: 'Oct', alerts: 85 },
    { name: 'Nov', alerts: 70 },
    { name: 'Dec', alerts: 60 },
  ];
  const alert_types = [
    { name: 'Motion Detected', value: 23 },
    { name: 'Sound Detected', value: 10 },
    { name: 'Object Detected', value: 8 },
    { name: 'Face Recognition', value: 12 },
    { name: 'Intrusion Detected', value: 5 },
    { name: 'Tampering Detected', value: 2 },
    { name: 'Low Battery', value: 3 },
    { name: 'Network Connection Lost', value: 7 },
  ];
  const weekly_data = [
    { name: 'Monday', alerts: 50 },
    { name: 'Tuesday', alerts: 60 },
    { name: 'Wednesday', alerts: 80 },
    { name: 'Thursday', alerts: 70 },
    { name: 'Friday', alerts: 90 },
    { name: 'Saturday', alerts: 120 },
    { name: 'Sunday', alerts: 100 },
  ];

  const area_map_data = [
    { time: '08:00', traffic: 200 },
  { time: '09:00', traffic: 500 },
  { time: '10:00', traffic: 700 },
  { time: '11:00', traffic: 800 },
  { time: '12:00', traffic: 900 },
  { time: '13:00', traffic: 1100 },
  { time: '14:00', traffic: 1300 },
  { time: '15:00', traffic: 1200 },
  { time: '16:00', traffic: 1000 },
  { time: '17:00', traffic: 800 },
  { time: '18:00', traffic: 600 },
  { time: '19:00', traffic: 400 },
  { time: '20:00', traffic: 300 },
  { time: '21:00', traffic: 200 },
  { time: '22:00', traffic: 100 },
  ];
  

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF3333', '#BFFF00', '#F8F32B'];
//const COLORS = ['#d4d4dc', '#e3e3e8', '#f2f2f4', '#f8f8f8', '#fafafa', '#fdfdfd', '#fefefe', '#ffffff'];
//const COLORS = ['#5f6caf', '#9b9cc4', '#c4c4d9', '#e6e6f2', '#f2f2f9', '#fdfdfd', '#fafafa', '#e3e3e8'];

export class ViewModal extends Component{
    constructor(props){
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) =>{
      this.setState({snackbaropen:false});
    };

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:3002/v1/api/addFloor',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
           // building_name: event.target.BuildingName.value
           building_name:this.props.buildingName,
           floor_num:event.target.FloorNumber.value,
           camera_name:event.target.CameraName.value,
           camera_loc:event.target.CameraLocation.value,
	       date_of_installation:event.target.DateofInstallation.value
          })
        })
        .then(res => res.json())
        .then((result)=>
        {
            this.setState({snackbaropen:true, snackbarmsg:result.message});
        },
        (error)=>{
          this.setState({snackbaropen:true, snackbarmsg:'failed'});
        }
        )
    }
       
    render(){
        return(
            <div className="container">
                <Snackbar 
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open = {this.state.snackbaropen}
                autoHideDuration = {3000}
                onClose={this.snackbarClose}

                message = {<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[
                <IconButton
                key="close"
                arial-label="Close"
                color="inherit"
                onClick={this.snackbarClose}
                >
                x
                </IconButton>
                ]}
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ color: '#6870fa' }}>
                        Historical Alert Analysis
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                     <div> 
                     <h4 style={{ color: '#6870fa' }} >Weekly Alert Trends</h4>         
                        <LineChart width={400} height={220} data={weekly_data} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="alerts" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                        <h4 style={{ color: '#6870fa' }}>Alert Types</h4>
                        <PieChart width={400} height={400}>
                            <Pie dataKey="value" isAnimationActive={false} data={alert_types} cx={200} cy={150} outerRadius={120} fill="#8884d8" label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div> 
                    <div>
                    <h4 style={{ color: '#6870fa' }}>Hourly Traffic Distribution</h4>
                        <AreaChart width={350} height={200} data={area_map_data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="traffic" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                        <div>  </div>
                        <h4 style={{ color: '#6870fa' }}>Yearly Alerts</h4>
                        <BarChart width={350} height={380} data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="alerts" fill="#8884d8" />
                        </BarChart>
                     </div> 
                {/* </div>               */}
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
        );
    }

}