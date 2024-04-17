import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllFinancials = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedFinancial, setSelectedFinancial] = useState(null);
    const [financials,setFinancials] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchFinancial(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/financials',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setFinancials(result.financials);
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
        fetchFinancial();
    }, []);

    const deleteFinancial = async (id) => {
        if(window.confirm("Are you sure you want to delete this Financial Report?")){
            try {
                const res= await fetch(`http://localhost:4000/api/financials/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Financial Report");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/financials',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setFinancials(result.financials);
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

      const newSearchFinancial = financials.filter((financial) => 
      financial.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchFinancial);

      setFinancials(newSearchFinancial);

    };
  

    return (<>This is the All Financial Reports page
    <br></br>
    <a href="/allfinancial" className="btn btn-danger my-2">Reload Financial Report</a>
    {loading ? <Spinner splash="Loading Financial Reports..." /> : (
        (financials.length == 0 ? <h3>No Financial Reports Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Financial"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Financial Reports:{financials.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
          <th>ID </th>
            <th>Day Duration</th>
            <th>Total Sales</th>
            <th>Total Cost</th>
            <th>Count of Sales</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && financials.map((financial) =>(
               <tr key={financial._id} onClick={()=> {
                setSelectedFinancial({});
                setSelectedFinancial(financial);
                setShowModal(true)}}>
                  <td>{financial.id}</td>
               <td>{financial.dduration}</td>
               <td>{financial.tsale}</td>
               <td>{financial.tcost}</td>
               <td>{financial.cofPsales}</td>
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
          {selectedFinancial && <Modal.Title>Financial Report Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedFinancial &&(
            <>
            <p><strong>ID:</strong> {selectedFinancial.id}</p>
            <p><strong>Day Duration:</strong> {selectedFinancial.dduration}</p>
          <p><strong>Total Sales:</strong>{selectedFinancial.tsale}</p>
          <p><strong>Total Cost:</strong> {selectedFinancial.tcost}</p>
          <p><strong>Count of Product Sales:</strong>{selectedFinancial.cofPsales}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editfinancial/${selectedFinancial?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteFinancial(selectedFinancial._id)
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


export default AllFinancials;