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


const Navbar = ({title = "Mandri Life"}) => {
  const {user,setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const {toast} = useContext(ToastContext);

  const handleTitleClick = () => {
    if(user && user.userRole === "CUSTOMER"){
      navigate("/customer");
    }else if(user && user.userRole === "EMPLOYEE_MANAGER"){
      navigate("/employee-manager");
    }else if(user && user.userRole === "INVENTORY_MANAGER"){
      navigate("/inventory-manager");
    }else if(user && user.userRole === "SUPPLIER_MANAGER"){
      navigate("/supplier-manager");
    }else if(user && user.userRole === "DELIVERY_MANAGER"){
      navigate("/delivery-manager");
    }else if(user && user.userRole === "PRODUCT_MANAGER"){
      navigate("/product-manager");
    }else if(user && user.userRole === "PAYMENT_MANAGER"){
      navigate("/payment-manager");
    }else if(user && user.userRole === "TRANSPORT_MANAGER"){
      navigate("/transport-manager");
    }else{
      navigate("/transport-manager");
    }
  }
    return (
      <ReactBootstrapNavbar expand="lg" b bg="primary" variant="dark" >
      <Container>
        
      <div to="#" onClick={handleTitleClick}>
      <ReactBootstrapNavbar.Brand >{title}</ReactBootstrapNavbar.Brand>
       </div>
        <ReactBootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav">
          {
            !user  && <Nav className="ms-auto">
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
            <Nav.Link  as = {Link} to="/create" style={{ marginLeft: '10px' }}>Create Employees</Nav.Link> 
            <Nav.Link  as = {Link} to="/allemployees" style={{ marginLeft: '10px' }}>All Employees</Nav.Link> 
            <Nav.Link  as = {Link} to="/createpayslip" style={{ marginLeft: '10px' }}>Create Payslips</Nav.Link> 
            <Nav.Link  as = {Link} to="/allpayslips" style={{ marginLeft: '10px' }}>All Payslips</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
            <Nav.Link  as = {Link} to="/allleaves" style={{ marginLeft: '10px' }}>All Leaves</Nav.Link> 
            <Button style={{ marginLeft: '10px' }} variant="danger" onClick={()=>{
              setUser(null);
              localStorage.clear();
              toast.success("Logged Out!");
              navigate("/login",{replace:true});
            }} >Logout</Button>
          </Form>
          </>}
          {user && user.userRole === "CUSTOMER_MANAGER" && <> 
            <Form className="d-flex ms-auto my-2">
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
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
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link>  
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
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
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
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
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
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link>  
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
            <Nav.Link  as = {Link} to="/allproducts" style={{ marginLeft: '10px' }}>All Products</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
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
           
            <Nav.Link  as = {Link} to="/allpayment" style={{ marginLeft: '10px' }}>All Payment</Nav.Link> 
            <Nav.Link  as = {Link} to="/createleave" style={{ marginLeft: '10px' }}>Add Leave</Nav.Link> 
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
            <Nav.Link  as = {Link} to="/createpayment" style={{ marginLeft: '10px' }}>Add Payment Details</Nav.Link> 
            <Nav.Link  as = {Link} to="/allpayment" style={{ marginLeft: '10px' }}>All Payment</Nav.Link> 
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