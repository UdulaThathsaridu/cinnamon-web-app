import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Register = () =>{
  const {toast} = useContext(ToastContext);
  const {registerUser} = useContext(AuthContext)

    const [credentails,setCredentials] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        
        setCredentials({ ...credentails, [name]:value });
    };

    const handleSubmit =(event) =>{
        event.preventDefault();
        console.log(credentails);
        //handle authentication
        if(!credentails.name ||!credentails.email || !credentails.password || !credentails.confirmPassword){
          toast.error("Please enter all the required fields!");
          return;
        }
        if(credentails.password !== credentails.confirmPassword){
          toast.error("Password do not match!");
          return;
        }
        const userData = {...credentails,confirmPassword: undefined};
        registerUser(userData);
    }
    return <>
    
    <h3>Create your Account</h3>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control id="name" name="name" type="text" 
        placeholder="Enter Name" value={credentails.name} onChange={handleInputChange} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control id="email" name="email" type="email" 
        placeholder="Enter email" value={credentails.email} onChange={handleInputChange} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control id="passwrod" name="password" type="password" 
        placeholder="Enter Password" value={credentails.password} onChange={handleInputChange} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control id="confirmPassword" name="confirmPassword" type="password" 
        placeholder="Enter Password" value={credentails.confirmPassword} onChange={handleInputChange} required/>
      </Form.Group>

      
      <Button id="btn" name="submit" variant="primary" type="submit">
        Register
      </Button>
      <Form.Group >
        <p>Already Have an Account?
        <Link to="/login">
        Login

        </Link></p>
      </Form.Group>
    </Form>
    </>
}

export default Register;