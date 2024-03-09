import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactBootstrapNavbar from 'react-bootstrap/Navbar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ToastContext from '../context/ToastContext';


const Navbar = ({title = "EMS"}) => {
  const {user,setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const {toast} = useContext(ToastContext);
    return (
      <ReactBootstrapNavbar expand="lg" b bg="primary" variant="dark" >
      <Container>
      <Link to = "/">
      <ReactBootstrapNavbar.Brand >{title}</ReactBootstrapNavbar.Brand>
       </Link>
        <ReactBootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav">
          {user ? <>
            <Form className="d-flex ms-auto">
            <Nav.Link  as = {Link} to="/create" >Create</Nav.Link> 
            <Button variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>:<Nav className="ms-auto">
           <Nav.Link as = {Link} to="/login" >Login</Nav.Link> 
           <Link to="/register">
           <Nav.Link as = {Link} to="/register">Register</Nav.Link>
           </Link>
           
        
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>  </Nav>}
          
        
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}


export default Navbar;