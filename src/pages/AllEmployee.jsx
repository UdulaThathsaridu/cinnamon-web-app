import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllEmployee = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees,setEmployees] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/employees',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setEmployees(result.employees);
               setLoading(false);
            }else{
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
        }
        fetchData();
    }, []);

    const deleteEmployee = async (id) => {
        if(window.confirm("Are you sure you want to delete this employee?")){
            try {
                const res= await fetch(`http://localhost:4000/api/employees/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Employee");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/employees',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setEmployees(result.employees);
               setLoading(false);
            }else{
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }

                }else{
    
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
            }

        }
       
    }
    
    const handleSearchSubmit = (event) => {
      event.preventDefault();

      const newSearchUser = employees.filter((employee) => 
      employee.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchUser);

      setEmployees(newSearchUser);

    };
  

    return (<>This is the All Employees page
    <br></br>
    <a href="/allemployees" className="btn btn-danger my-2">Reload Employees</a>
    {loading ? <Spinner splash="Loading Employees..." /> : (
        (employees.length == 0 ? <h3>No Employeees Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Employee"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Employees:{employees.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && employees.map((employee) =>(
               <tr key={employee._id} onClick={()=> {
                setSelectedEmployee({});
                setSelectedEmployee(employee);
                setShowModal(true)}}>
               <td>{employee.name}</td>
               <td>{employee.address}</td>
               <td>{employee.email}</td>
               <td>{employee.phone}</td>
               <td>{employee.userRole}</td>
             </tr>
  
          ))}
        </tbody>
      </Table> </>)
        
    )}
     <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showModal} onHide={()=>{
        setShowModal(false)
      }}>
        <Modal.Header closeButton>
          {selectedEmployee && <Modal.Title>Employee Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedEmployee &&(
            <>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Address:</strong>{selectedEmployee.address}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p>
          <p><strong>Phone:</strong>{selectedEmployee.phone}</p>
          <p><strong>Role:</strong>{selectedEmployee.userRole}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/edit/${selectedEmployee?._id}`}>
            Edit</Link>
            <Link 
        className="btn btn-info"
        to={`/createpayslip/${selectedEmployee?._id}?name=${selectedEmployee?.name}`}>
            Create Payslip</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteEmployee(selectedEmployee._id)
          }}>Delete</Button>
          <Button id="btn btn-warning" variant="secondary" onClick={()=>{
            setShowModal(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    
    </>
    );
      }


export default AllEmployee;
