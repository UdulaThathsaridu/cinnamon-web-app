import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateFinancial = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [financialDetails,setFinancialDetails] = useState({
        id:"",
        dduration:"",
        tsale:"",
        tcost:"",
        cofPsales:""
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setFinancialDetails({...financialDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/financials',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(financialDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${financialDetails.name}]`);

          setFinancialDetails({id:"",dduration:"",tsale:"",tcost:"",cofPsales:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Financial Report Details</h2>

    <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control id="id" name="id" type="text" 
        placeholder="Enter Financial ID"  value={financialDetails.id} onChange={handleInputChange}  required/>
      </Form.Group>
    
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Day Duration</Form.Label>
        <Form.Control id="dduration" name="dduration" type="number" 
        placeholder="Enter Day Duration"  value={financialDetails.dduration} onChange={handleInputChange}  required/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="tsale">
        <Form.Label>Total Sales</Form.Label>
        <Form.Control id="tsale" name="tsale" type="number" 
        placeholder="Enter Total Sales" value={financialDetails.tsale} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tcost">
        <Form.Label>Total Cost</Form.Label>
        <Form.Control id="tcost" name="tcost" type="number" 
        placeholder="Enter Total Cost" value={financialDetails.tcost} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="cofPsales">
        <Form.Label>Count of Product Sales</Form.Label>
        <Form.Control id="cofPsales" name="cofPsales" type="number" 
        placeholder="Enter Count of Product Sales" value={financialDetails.cofPsales} onChange={handleInputChange} required/>
      </Form.Group>

      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Financial Report Details
      </Button>
     
      
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateFinancial;