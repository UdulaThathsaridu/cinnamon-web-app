import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";
import { Spinner } from "react-bootstrap";

const EditLeave = () =>{

    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [leaveDetails,setLeaveDetails] = useState({
        id:"",
        leaveType:"",
        leaveTypeDetails:"",
        createdOn:"",
        leaveTypeStatus:"",
    });
    const [loading,setLoading]= useState(false);
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setLeaveDetails({...leaveDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:4000/api/leaves/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify({id,...leaveDetails}),
        
        });
        const result = await res.json();
        if(!result.error){

          toast.success(`Updated [${leaveDetails.leaveType}]`);
         setLeaveDetails({leaveType:"",leaveTypeDetails:"",createdOn:"",leaveTypeStatus:""});
         navigate("/allleaves");

        }else{
            toast.error(result.error);

        }
    }

    useEffect(() => {

        async function fetchLeaves() {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/leaves/${id}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                
            })
            const result = await res.json();

            setLeaveDetails({
                leaveType:result.leaveType,
                leaveTypeDetails:result.leaveTypeDetails,
                createdOn:result.createdOn,
                leaveTypeStatus:result.leaveTypeStatus
            });
            setLoading(false);
            
        } catch (err) {
            console.log(err);
            
        }
        }
        
        fetchLeaves()
    },[])

    return(<>
    {loading ? <Spinner splash="Loading Leaves..."/>:(<>
        <h2>Approve/reject Leaves</h2>
    
        <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Leave Type</Form.Label>
        <Form.Control id="leaveType" name="leaveType" type="text" 
        placeholder="Enter Leave Type"  value={leaveDetails.leaveType} onChange={handleInputChange}  required disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="leaveTypeDetails">
        <Form.Label>Leave Type Details</Form.Label>
        <Form.Control id="leaveTypeDetails" name="leaveTypeDetails" as="textarea" rows={5}
        placeholder="Enter Leave Type Details" value={leaveDetails.leaveTypeDetails} onChange={handleInputChange} required disabled/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="createdOn">
        <Form.Label>Created On</Form.Label>
        <Form.Control id="createdOn" name="createdOn" type="date" 
        placeholder="Created On" value={leaveDetails.createdOn} onChange={handleInputChange} required disabled/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="leaveTypeStatus">
        <Form.Label>Leave Status</Form.Label>
        <Form.Control id="leaveTypeStatus" name="leaveTypeStatus" type="tel" 
        placeholder="Leave Status" value={leaveDetails.leaveTypeStatus} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Approve/Reject Leave
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>
    </>)}
    

    </>
    );
      };


export default EditLeave;
