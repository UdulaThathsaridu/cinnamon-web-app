import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditInventories = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [userDetails,setUserDetails] = useState({
        name:"",
        address:"",
        email:"",
        phone:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setUserDetails({...userDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/inventories',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...userDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${userDetails.name}]`);
         setUserDetails({name:"",address:"",email:"",phone:""});
         navigate("/allemployees");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/employees/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setUserDetails({
                name:result.name,
                address:result.address,
                email:result.email,
                phone:result.phone
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchData()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Employee..."/>:(<>
        <h2>Edit Employees</h2>
    
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
        <Form.Label>Empoyee Phone Number</Form.Label>
        <Form.Control conid="phone" name="phone" type="tel" 
        placeholder="Enter Phone Number" value={userDetails.phone} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Save Changes
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditInventories;
