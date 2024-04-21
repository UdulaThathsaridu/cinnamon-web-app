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
    const handleViewAllPaymentsClick = () => {
        navigate("/allpayment"); // Navigate to the All Payments page
    }

    const handleViewAllFinancialReportsClick = () => {
        navigate("/allfinancial"); // Navigate to the All Financial Reports page
    }

    const handleViewAllInvoicesClick = () => {
        navigate("/allinvoice"); // Navigate to the All Invoices page
    }

    const handleAddLeaveClick = () => {
        navigate("/createleave"); // Navigate to the Add Leave page
    }

    return (
        
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '200%', // Adjust the height as needed
            backgroundColor: 'rgba(123, 63, 0, 0.5)', // Semi-transparent cinnamon brown
            zIndex: -1,
        }}>
        
        <div style={{ textAlign: 'center', fontSize: '50px',fontWeight: 'bold',  marginTop: '80px',color: 'black' }}>
             
            Welcome {user ? user.name : null}...!
            </div>
                
                
           
            

                <div style={{ textAlign: 'left', marginRight: '500px' }}>
                    <button onClick={handleAddFinancialClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/4.png" alt="Add Financial" style={{ width: '150px', height: '150px' }} />
                    </button>
                   <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00',
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={handleAddFinancialClick}>Add Financial Reports</button>
                </div>  
                <div style={{ textAlign: 'left', marginRight: '500px' }}>
                    <button onClick={handleAddInvoiceClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/5.png" alt="Add Invoice" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border:'3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={handleAddInvoiceClick}>Add Invoice</button>
                </div>
                <div style={{ textAlign: 'left', marginRight: '500px' }}>
                    <button onClick={ handleAddLeaveClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/6.png" alt="Saved Payment Details" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={handleAddLeaveClick}> Add Leave</button>
                </div>
           
                <div style={{ textAlign: 'right', marginRight: '102px' }}>
                    <button onClick={handleViewAllFinancialReportsClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/7.png" alt="Saved Payment Details" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={handleViewAllFinancialReportsClick}> View Financial Reports</button>
                </div>
               
                <div style={{ textAlign: 'right', marginRight: '200px' }}>
                    <button onClick={handleViewAllInvoicesClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/8.png" alt="Saved Payment Details" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={handleViewAllInvoicesClick}> View Invoices</button>
                </div>
                
                <div style={{ textAlign: 'right', marginRight: '140px' }}>
                    <button onClick={handleViewAllPaymentsClick} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/9.png" alt="Saved Payment Details" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={handleViewAllPaymentsClick}> View Saved Details</button>
                </div>
            </div>
            


     
    );
  
      }


export default PaymentManagerHome;
