import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateProduct = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [productDetails,setProductDetails] = useState({
        name:"",
        productId:"",
        quantity:"",
        price:"",
        description:""
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setProductDetails({...productDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/products',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(productDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${productDetails.name}]`);

          setUserDetails({name:"",productId:"",quantity:"",price:"",description:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Products</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Product Name"  value={productDetails.name} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="productId">
        <Form.Label>Product ID</Form.Label>
        <Form.Control id="productId" name="productId" type="text" 
        placeholder="Enter Product ID" value={productDetails.productId} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Quantity</Form.Label>
        <Form.Control id="quantity" name="quantity" type="number" 
        placeholder="Quantity" value={productDetails.quantity} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control id="price" name="price" type="text" 
        placeholder="Enter Price" value={productDetails.price} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control id="description" name="description" as="textarea" rows={5}
        placeholder="Enter description" value={productDetails.description} onChange={handleInputChange} required/>
      </Form.Group>
      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Product
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateProduct;
