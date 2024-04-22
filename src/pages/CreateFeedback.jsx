import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateFeedback = () =>{
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    const [feedbackDetails,setFeedbackDetails] = useState({
        productName:"",
        overallExperience:"",
        quality:"",
        likelihoodToReccomend:"",
        improvedSuggestions:"",
    });
    const navigate = useNavigate();
 


    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setFeedbackDetails({...feedbackDetails, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch('http://localhost:4000/api/feedbacks',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            body:JSON.stringify(feedbackDetails),
        
        });
  
        const result = await res.json();
        if(!result.error){

          toast.success(`Created [${feedbackDetails.productName}]`);

          setFeedbackDetails({productName:"",overallExperience:"",quality:"",likelihoodToReccomend:"",improvedSuggestions:""});
        }else{
          
            toast.error(result.error);

        }
    }
    return(<>
    <h2>Add Feedback</h2>
    
    <Form onSubmit={handleSubmit} >
    <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control id="productName" name="productName" type="text" 
        placeholder="Enter Product Name"  value={feedbackDetails.productName} onChange={handleInputChange}  required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="overallExperience">
        <Form.Label>Overall Experience</Form.Label>
        <Form.Control id="overallExperience" name="overallExperience" type="text" 
        placeholder="Enter Overall Experience" value={feedbackDetails.overallExperience} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="quality">
        <Form.Label>quality</Form.Label>
        <Form.Control id="quality" name="quality" type="text" 
        placeholder="Enter quality" value={feedbackDetails.quality} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="likelihoodToReccomend">
        <Form.Label>likelihoodToReccomend</Form.Label>
        <Form.Control id="likelihoodToReccomend" name="likelihoodToReccomend" type="text" 
        placeholder="Enter likelihoodToReccomend" value={feedbackDetails.likelihoodToReccomend} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="improvedSuggestions">
        <Form.Label>improvedSuggestions</Form.Label>
        <Form.Control id="improvedSuggestions" name="improvedSuggestions" type="text" 
        placeholder="Enter improvedSuggestions" value={feedbackDetails.improvedSuggestions} onChange={handleInputChange} required/>
      </Form.Group>

   
      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Add feedback
      </Button>
      <Form.Group >
        
      </Form.Group>
    </Form>

    </>
    );
      };


export default CreateFeedback;
