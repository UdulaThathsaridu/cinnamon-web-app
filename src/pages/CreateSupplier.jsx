import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateSupplier = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [supplierDetails,setSupplierDetails] = useState({
        name:"",
        email:"",
        registeredDate:"",
        location:"",
        
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setSupplierDetails({...supplierDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/suppliers',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(supplierDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${supplierDetails.name}]`);

          setSupplierDetails({name:"",email:"",registeredDate:"",location:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Suppliers</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Supplier Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Supplier Name"  value={supplierDetails.name} onChange={handleInputChange}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Supplier Email address</Form.Label>
        <Form.Control id="email" name="email" type="email" 
        placeholder="Enter Supplier email" value={supplierDetails.email} onChange={handleInputChange} required/>
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="registeredDate">
        <Form.Label>Registered Date to Our Company</Form.Label>
        <Form.Control id="registeredDate" name="registeredDate" type="date" 
        placeholder="Enter Registered Date" value={supplierDetails.registeredDate} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="location">
        <Form.Label>Supplier Location</Form.Label>
        <Form.Control id="location" name="location" type="text" 
        placeholder="Enter Supplier Location" value={supplierDetails.location} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Supplier
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateSupplier;
