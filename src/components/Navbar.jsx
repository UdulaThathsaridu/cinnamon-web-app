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
          {
            user === undefined && <Nav className="ms-auto">
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
             </NavDropdown>  </Nav>
          }
          {user && user.userRole === "EMPLOYEE_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/create" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/allemployees" style={{ marginLeft: '10px' }}>All Employees</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "INVENTORY_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createinventory" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/allinventories" style={{ marginLeft: '10px' }}>All Inventories</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "SUPPLIER_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createsuppliers" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/allsuppliers" style={{ marginLeft: '10px' }}>All Suppliers</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "DELIVERY_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createdeliveries" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/alldeliveries" style={{ marginLeft: '10px' }}>All Deliveries</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "TRANSPORT_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createtransports" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/alltransports" style={{ marginLeft: '10px' }}>All Transports</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "PRODUCT_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createproducts" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/allproducts" style={{ marginLeft: '10px' }}>All Transports</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "PAYMENT_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createpayment" style={{ marginLeft: '10px' }}>Create</Nav.Link> 
            <Nav.Link  as = {Link} to="/allpayment" style={{ marginLeft: '10px' }}>All Payment</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "CUSTOMER" && <> 
            <Form className="d-flex ms-auto my-2">
            
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
        
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
}


export default Navbar;