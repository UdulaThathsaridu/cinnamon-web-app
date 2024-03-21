import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditDeliveries = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [deliveryDetails,setDeliveryDetails] = useState({
        name:"",
        address:"",
        weight:"",
        courierName:"",
        status:"",
        description:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setDeliveryDetails({...deliveryDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/deliveries/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...deliveryDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${deliveryDetails.name}]`);
         setDeliveryDetails({name:"",address:"",weight:"",courierName:"",status:"",description:""});
         navigate("/alldeliveries");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchDelivery() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/deliveries/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setDeliveryDetails({
                name:result.name,
                address:result.address,
                weight:result.weight,
                courierName:result.courierName,
                status:result.status,
                description:result.description,
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchDelivery()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Deliveries..."/>:(<>
        <h2>Edit Deliveries</h2>
    
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
        Edit Delivery
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditDeliveries;
