import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateTransport = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [vehicleDetails,setVehicleDetails] = useState({
        vehicle:"",
        model:"",
        status:"",
        last_inspection:"",
        next_inspection:"",
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setVehicleDetails({...vehicleDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/vehicles',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(vehicleDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${vehicleDetails.vehicle}]`);

          setVehicleDetails({vehicle:"",model:"",status:"",last_inspection:"",next_inspection:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Vehicles</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Vehicle Name</Form.Label>
        <Form.Control id="vehicle" name="vehicle" type="text" 
        placeholder="Enter Vehicle Name"  value={vehicleDetails.vehicle} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Vehicle Model</Form.Label>
        <Form.Control id="model" name="model" type="text" 
        placeholder="Enter Vehicle Model" value={vehicleDetails.model} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Vehicle Status</Form.Label>
        <Form.Control id="status" name="status" type="text" 
        placeholder="Enter Vehicle Status" value={vehicleDetails.status} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="last_inspection">
        <Form.Label>Last Inspection</Form.Label>
        <Form.Control id="last_inspection" name="last_inspection" type="date" 
        placeholder="Enter Last Inspection" value={vehicleDetails.last_inspection} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="next_inspection">
        <Form.Label>Next Inspection</Form.Label>
        <Form.Control id="next_inspection" name="next_inspection" type="date" 
        placeholder="Enter Next Inspection" value={vehicleDetails.next_inspection} onChange={handleInputChange} required/>
      </Form.Group>

   
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Vehicle
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateTransport;
