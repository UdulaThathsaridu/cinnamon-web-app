import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';


const Login = () =>{
  const {toast} = useContext(ToastContext);
  const {loginUser} = useContext(AuthContext);


    const [credentails,setCredentials] = useState({
        email:"",
        password:"",
    });

    const handleInputChange = (event) => {
        const {name,value} = event.target;

        setCredentials({ ...credentails, [name] : value})

    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

       
//handle authentications
        if(!credentails.email || !credentails.password){
          toast.error("Please enter all the required fields!!");
          return;

        }
        await loginUser(credentails);
    }
    return (<>
    
   
    <h3>Login</h3>
    <Form onSubmit={handleSubmit}>
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
        <Form.Control id="password" name="password" type="password" 
        placeholder="Password" value={credentails.password} onChange={handleInputChange} required/>
      </Form.Group>
      
      <Button id="btn"name="submit"variant="primary" type="submit">
        Login
      </Button>
      <Form.Group >
        <p>Don't Have an Account?
        <Link to="/register">
        Register

        </Link></p>
      </Form.Group>
    </Form>
    </>
    )
}
    
 

export default Login;