import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllPayslips = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedPayslip, setSelectedPayslip] = useState(null);
    const [payslips,setPayslipDetails] = useState([]);
    const [searchInput,setSearchInput] = useState("");
    const [selectedEmployee,setSelectedEmployee] = useState(null);
    const [employees,setEmployees] = useState([]);
  

    useEffect(() => {
        async function fetchPayslips(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/payslips',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setPayslipDetails(result.payslips);
               setLoading(false);
            }else{
                toast.error(result.error);
                console.log(result);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
        }
        fetchPayslips();
    }, [toast]);

    const deletePayslip = async (id) => {
        if(window.confirm("Are you sure you want to delete this payslip?")){
            try {
                const res= await fetch(`http://localhost:4000/api/payslips/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Payslip");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/payslips',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setPayslipDetails(result.payslips);
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

      const newSearchPayslip = payslips.filter((payslip) => {
      return payslip && payslip.name && payslip.name.toLowerCase().includes(searchInput.toLowerCase())
      });
      console.log(newSearchPayslip);

      setPayslipDetails(newSearchPayslip);

    };
  

    return (<>This is the All Payslip page
    <br></br>
    <a href="/allpayslips" className="btn btn-danger my-2">Reload Payslips</a>
    {loading ? <Spinner splash="Loading Payslips..." /> : (
        (payslips.length == 0 ? <h3>No Payslips Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Payslip"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Payslips:{payslips.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Other Allowances</th>
            <th>Other Deductions</th>
            <th>Basic</th>
            <th>Total Allowances</th>
            <th>Total Deductions</th>
            <th>Net Salaty</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && payslips.map((payslip) =>(
               <tr key={payslip._id} onClick={()=> {
                setSelectedPayslip({});
                setSelectedPayslip(payslip);
                setShowModal(true)}}>
               <td>{payslip.id}</td>
               <td>{payslip.name}</td>
               <td>{payslip.date}</td>
               <td>{payslip.allowances}</td>
               <td>{payslip.deductions}</td>
               <td>{payslip.otherAllowances}</td>
               <td>{payslip.otherDeductions}</td>
               <td>{payslip.basic}</td>
               <td>{payslip.totalAllowance}</td>
               <td>{payslip.totalDeduction}</td>
               <td>{payslip.netSalary}</td>
               <td>{payslip.paymentMethod}</td>
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
          {selectedPayslip && <Modal.Title>Payslip Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedPayslip &&(
            <>
            <p><strong>Id:</strong> {selectedPayslip.id}</p>
            <p><strong>Id:</strong> {selectedPayslip.name}</p>
          <p><strong>Date:</strong>{selectedPayslip.date}</p>
          <p><strong>Allowances:</strong> {selectedPayslip.allowances}</p>
          <p><strong>Deductions:</strong>{selectedPayslip.deductions}</p>
          <p><strong>Other Allowances:</strong>{selectedPayslip.otherAllowances}</p>
          <p><strong>Other Deductions:</strong>{selectedPayslip.otherDeductions}</p>
          <p><strong>Basic:</strong>{selectedPayslip.basic}</p>
          <p><strong>Total Allowances:</strong>{selectedPayslip.totalAllowance}</p>
          <p><strong>Total Deductions:</strong>{selectedPayslip.totalDeduction}</p>
          <p><strong>Net Salary:</strong>{selectedPayslip.netSalary}</p>
          <p><strong>Payment Method:</strong>{selectedPayslip.paymentMethod}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editpayslip/${selectedPayslip?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deletePayslip(selectedPayslip._id)
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


export default AllPayslips;
