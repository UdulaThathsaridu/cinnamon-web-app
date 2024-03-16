import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const TransportManagerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        !user && navigate("/login", {replace:true });

    },[]);

    return <>This is Transport Manager Home page {user ? user.name : null} 
    <br></br>
    <Button id="AddEmployee" variant="primary" type="submit">Add Employee</Button>{' '}
    </>
  
      }


export default TransportManagerHome;
