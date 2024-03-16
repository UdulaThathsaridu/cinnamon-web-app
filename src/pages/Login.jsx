import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link ,useNavigate } from 'react-router-dom';


import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';


const Login = () =>{
  const {toast} = useContext(ToastContext);
  const {loginUser} = useContext(AuthContext);
  const navigate = useNavigate();


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
        try {
          const { user } = await loginUser(credentails);
          toast.success(`Logged in ${user.name}`);
          if(user && user.userRole){
            switch(user.userRole){
              case 'EMPLOYEE_MANAGER':
                navigate('/employee-manager');
                break;
              case 'INVENTORY_MANAGER':
                navigate('/inventory-manager');
                break;
                case 'SUPPLIER_MANAGER':
                  navigate('/supplier-manager');
                  break;
                case 'DELIVERY_MANAGER':
                  navigate('/delivery-manager');
                  break;
                case 'TRANSPORT_MANAGER':
                  navigate('/transport-manager');
                  break;
                case 'PRODUCT_MANAGER':
                  navigate('/product-manager') ;
                  break;
                case 'PAYMENT_MANAGER':
                  navigate('/payment-manager');
                  break;
                  case 'CUSTOMER_MANAGER':
                    navigate('/customer-manager');
                    break;   
              default:
                  navigate('/customer');
                  break;
            }
          }
        } catch (err) {
          console.log(err);
           toast.error('Failed to login.Please try again')
        }
        
    };
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