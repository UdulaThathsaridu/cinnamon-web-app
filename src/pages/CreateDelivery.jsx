import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateDelivery = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [deliveryDetails,setDeliveryDetails] = useState({
        name:localStorage.getItem("name"),
        address:localStorage.getItem("address"),
        weight:"",
        courierName:"",
        status:"",
        description:"",
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setDeliveryDetails({...deliveryDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/deliveries',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(deliveryDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${deliveryDetails.name}]`);

          setDeliveryDetails({name:localStorage.getItem("name"),address:localStorage.getItem("address"),weight:"",courierName:"",status:"",description:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Delivery</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Customer Name"  value={deliveryDetails.name} onChange={handleInputChange}  required disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Customer Address</Form.Label>
        <Form.Control id="address" name="address" type="text" 
        placeholder="Enter Customer Address" value={deliveryDetails.address} onChange={handleInputChange} required disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="weight">
        <Form.Label>Order Weight</Form.Label>
        <Form.Control id="weight" name="weight" type="number" 
        placeholder="Enter Order Weight" value={deliveryDetails.weight} onChange={handleInputChange} required/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="courierName">
        <Form.Label>Delivery Company Name</Form.Label>
        <Form.Control id="courierName" name="courierName" type="text" 
        placeholder="Enter Delivery Company Name" value={deliveryDetails.courierName} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="courierName">
        <Form.Label>Status</Form.Label>
        <Form.Control id="status" name="status" type="text" 
        placeholder="Enter Status" value={deliveryDetails.status} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control id="description" name="description" as="textarea" rows={5} 
        placeholder="Enter Description" value={deliveryDetails.description} onChange={handleInputChange} required/>
      </Form.Group>

      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Delivery
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateDelivery;
