import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditInvoice = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [invoiceDetails,setInvoiceDetails] = useState({
        id:"",
        cname:"",
        orderid:"",
        orderedDate:"",
        tamount:""
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setInvoiceDetails({...invoiceDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/invoices/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...invoiceDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${invoiceDetails.name}]`);
         setUserDetails({id:"",cname:"",orderid:"",orderedDate:"",tamount:""});
         navigate("/allinvoices");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchInvoice() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/invoices/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setInvoiceDetails({
                id:result.id,
                cname:result.cname,
                orderid:result.orderid,
                orderedDate:result.orderedDate,
                tamount:result.tamount,
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchInvoice()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Invoices..."/>:(<>
        <h2>Edit Invoice Details</h2>
    
        <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" >
        <Form.Label>ID</Form.Label>
        <Form.Control id="id" name="id" type="text" 
        placeholder="Enter Invoice ID"  value={invoiceDetails.id} onChange={handleInputChange}  required/>
      </Form.Group>   

    <Form.Group className="mb-3" controlId="text">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control id="cname" name="cname" type="text" 
        placeholder="Enter Customer Name"  value={invoiceDetails.cname} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="number">
        <Form.Label>Order ID</Form.Label>
        <Form.Control id="orderid" name="orderid" type="number" 
        placeholder="Enter Order ID" value={invoiceDetails.orderid} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="expiryDate">
        <Form.Label>Ordered Date</Form.Label>
        <Form.Control id="orderedDate" name="orderedDate" type="date" 
        placeholder="Enter Ordered Date" value={invoiceDetails.orderedDate} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="tamount">
        <Form.Label>Total Amount</Form.Label>
        <Form.Control id="tamount" name="tamount" type="number" 
        placeholder="Enter Total Amount" value={invoiceDetails.tamount} onChange={handleInputChange} required/>
      </Form.Group>
    
    
      <Button id="btn" name="submit" variant="primary" type="submit">
        Confirm Changes
      </Button>
   
      
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditInvoice;