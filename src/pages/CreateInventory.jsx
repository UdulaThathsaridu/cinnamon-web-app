import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateInventory = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [inventoryDetails,setInventoryDetails] = useState({
        productname:"",
        sku:"",
        quantity:"",
        unitprice:"",
        itemno:"",
        suppliername:""
    });
    const navigate = useNavigate();
 

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setInventoryDetails({ ...inventoryDetails, [name]: value });
  }
  

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/inventories',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(inventoryDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${inventoryDetails.productname}]`);

          setInventoryDetails({productname:"",sku:"",quantity:"",unitprice:"",itemno:"",suppliername:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Inventories</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control id="productname" name="productname" type="text" 
        placeholder="Enter Product Name"  value={inventoryDetails.productname} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="sku">
        <Form.Label>Product SKU</Form.Label>
        <Form.Control id="sku" name="sku" type="text" 
        placeholder="Enter Product SKU" value={inventoryDetails.sku} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="quantity">
        <Form.Label>Product Quantity</Form.Label>
        <Form.Control id="quantity" name="quantity" type="number" 
        placeholder="Enter Product Quantity" value={inventoryDetails.quantity} onChange={handleInputChange} required/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="unitprice">
        <Form.Label>Enter Unit Price</Form.Label>
        <Form.Control id="unitprice" name="unitprice" type="number" 
        placeholder="Enter Unit Price" value={inventoryDetails.unitprice} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="itemno">
        <Form.Label>Enter Item Number</Form.Label>
        <Form.Control id="itemno" name="itemno" type="number" 
        placeholder="Enter Item Number" value={inventoryDetails.itemno} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="suppliername">
        <Form.Label>Enter Supplier Name</Form.Label>
        <Form.Control id="suppliername" name="suppliername" type="text" 
        placeholder="Enter Supplier Name" value={inventoryDetails.suppliername} onChange={handleInputChange} required/>
      </Form.Group>



      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Inventory
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateInventory;