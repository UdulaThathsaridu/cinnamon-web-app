import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const PaymentManagerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        !user && navigate("/login", {replace:true });

    },[]);
    const handleAddFinancialClick = () => {
        navigate("/createfinancial"); // Navigate to the CreateFinancial page
    }

    const handleAddInvoiceClick = () => {
        navigate("/createinvoice"); // Navigate to the CreateFinancial page
    }

    return <>This is Payment Manager Home page {user ? user.name : null} 
    <br></br>
    <Button variant="primary" onClick={handleAddFinancialClick}>Add Financial Reports</Button>
    <Button variant="primary" onClick={handleAddInvoiceClick}>Add Invoice</Button>
    </>
  
      }


export default PaymentManagerHome;
