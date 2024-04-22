import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";


const CreateInvoice = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [invoiceDetails,setInvoiceDetails] = useState({
        id:"",
        cname:"",
        orderid:"",
        orderedDate:"",
        tamount:""
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setInvoiceDetails({...invoiceDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/invoices ',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(invoiceDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${invoiceDetails.name}]`);

          setInvoiceDetails({id:"",cname:"",orderid:"",orderedDate:"",tamount:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Invoice Details</h2>
    
    <Form onSubmit={handleSubmit} >

      <Form.Group className="mb-3">
    <Form.Label>ID</Form.Label>
    <Form.Control id="id" name="id" type="text" 
    placeholder="Enter Invoice ID"  value={invoiceDetails.id} onChange={handleInputChange}  required/>
</Form.Group>


      <Form.Group className="mb-3" controlId="cname">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control id="" name="cname" type="text" 
        placeholder="Enter Customer Name"  value={invoiceDetails.cname} onChange={handleInputChange}  required/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="orderid">
        <Form.Label>Order ID</Form.Label>
        <Form.Control id="orderid" name="orderid" type="number" 
        placeholder="Enter Order ID" value={invoiceDetails.orderid} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ordredDate">
        <Form.Label>Ordered Date</Form.Label>
        <Form.Control id="orderedDate" name="orderedDate" type="date" 
        placeholder="Enter Ordered Date" value={invoiceDetails.orderedDate} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tamount">
        <Form.Label>Total Amount</Form.Label>
        <Form.Control id="tamount" name="tamount" type="number" 
        placeholder="Enter Total Amount" value={invoiceDetails.tamount} onChange={handleInputChange} required/>
      </Form.Group>

      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Invoice Details
      </Button>
     
      
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateInvoice;