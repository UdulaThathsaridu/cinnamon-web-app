import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreatePayment = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [userDetails,setUserDetails] = useState({
        name:"",
        address:"",
        email:"",
        phone:"",
        userRole:"EMPLOYEE"
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setUserDetails({...userDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/payments',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(userDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${userDetails.name}]`);

          setUserDetails({name:"",address:"",email:"",phone:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Employees</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Employee Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Employee Name"  value={userDetails.name} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Employee Address</Form.Label>
        <Form.Control id="address" name="address" type="text" 
        placeholder="Enter Employee Address" value={userDetails.address} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Employee Email address</Form.Label>
        <Form.Control id="email" name="email" type="email" 
        placeholder="Enter Employee email" value={userDetails.email} onChange={handleInputChange} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Employee Phone Number</Form.Label>
        <Form.Control id="phone" name="phone" type="tel" 
        placeholder="Enter Phone Number" value={userDetails.phone} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="role">
        <Form.Label>Employee Role</Form.Label>
          <Form.Select value={userDetails.userRole} onChange={handleInputChange} id="userRole" name="userRole">
            <option value="EMPLOYEE">Employee</option>
            <option value="EMPLOYEE_MANAGER">Employee Manager</option>
            <option value="INVENTORY_MANAGER">Inventory Manager</option>
            <option value="SUPPLIER_MANAGER">Supplier Manager</option>
            <option value="DELIVERY_MANAGER">Delivery Manager</option>
            <option value="TRANSPORT_MANAGER">Transport Manager</option>
            <option value="PRODUCT_MANAGER">Product Manager</option>
            <option value="PAYMENT_MANAGER">Payment Manager</option>
          </Form.Select>
      </Form.Group>
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Add Employee
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreatePayment;
