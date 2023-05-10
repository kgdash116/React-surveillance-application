import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';

export class AddCameraModal extends Component{
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
                            Add Camera in {this.props.buildingName}
                        </Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    {/* <Row>
                        <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="BuildingName">
                        <Form.Label>BuildingName</Form.Label>
                        <Form.Control
                            type="text"
                            name="BuildingName"
                            required
                            placeholder="BuildingName"
                        />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit" >
                            Add Building
                            </Button>
                        </Form.Group>
                        </Form>
                        </Col>
                    </Row>   */}
                    <Row>
                        <Col sm={12}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="CameraName" style={{ marginBottom: '20px' }}>
                        <Form.Label style={{ fontSize: '20px',color: '#6870fa' }}>Camera Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="CameraName"
                            required
                            placeholder="Camera Name"
                        />
                        </Form.Group>
                        <Form.Group controlId="CameraLocation" style={{ marginBottom: '20px' }}>
                        <Form.Label style={{ fontSize: '20px',color: '#6870fa' }}>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="CameraLocation"
                            required
                            placeholder="Camera placement (e.g. hallway, entrance)"
                        />
                        </Form.Group>
                        <Form.Group controlId="FloorNumber" style={{ marginBottom: '20px' }}>
                        <Form.Label style={{ fontSize: '20px',color: '#6870fa' }}> Floor number</Form.Label>
                        <Form.Control
                            type="text"
                            name="FloorNumber"
                            required
                            placeholder="Floor number (e.g. 1, 2, 3)"
                        />
                        </Form.Group>
                        <Form.Group controlId="DateofInstallation" style={{ marginBottom: '20px' }}>
                        <Form.Label style={{ fontSize: '20px',color: '#6870fa' }}>Date of Installation</Form.Label>
                        <Form.Control
                            type="text"
                            name="DateofInstallation"
                            required
                            placeholder="YYYY-MM-DD"
                        />
                        </Form.Group>
                        

                        <Form.Group>
                            <Modal.Footer>
                            <Button variant="primary" type="submit" style={{ backgroundColor: '#6870fa', color: 'white',border: '#6870fa' }} >
                            Add Device
                            </Button>
                            </Modal.Footer>
                        </Form.Group>
                        </Form>
                        </Col>
                    </Row>  
                    
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </div>
        );
    }

}