import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllSuppliers = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [suppliers,setSuppliers] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchSupplier(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/suppliers',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setSuppliers(result.suppliers);
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
        fetchSupplier();
    }, []);

    const deleteSupplier = async (id) => {
        if(window.confirm("Are you sure you want to delete this Supplier?")){
            try {
                const res= await fetch(`http://localhost:4000/api/suppliers/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Supplier");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/suppliers',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setSuppliers(result.suppliers);
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

      const newSearchSupplier = suppliers.filter((supplier) => 
      supplier.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchSupplier);

      setSuppliers(newSearchSupplier);

    };
  

    return (<>This is the All Suppliers page
    <br></br>
    <a href="/allsuppliers" className="btn btn-danger my-2">Reload Suppliers</a>
    {loading ? <Spinner splash="Loading Suppliers..." /> : (
        (suppliers.length == 0 ? <h3>No Suppliers Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Suppliers"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Suppliers:{suppliers.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Registered Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && suppliers.map((supplier) =>(
               <tr key={supplier._id} onClick={()=> {
                setSelectedSupplier({});
                setSelectedSupplier(supplier);
                setShowModal(true)}}>
               <td>{supplier.name}</td>
               <td>{supplier.email}</td>
               <td>{supplier.registeredDate}</td>
               <td>{supplier.location}</td>
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
          {selectedSupplier && <Modal.Title>Supplier Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedSupplier &&(
            <>
            <p><strong>Name:</strong> {selectedSupplier.name}</p>
          <p><strong>Email:</strong>{selectedSupplier.email}</p>
          <p><strong>Registered Date:</strong> {selectedSupplier.registeredDate}</p>
          <p><strong>Location:</strong>{selectedSupplier.location}</p>
          
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editsupplier/${selectedSupplier?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteSupplier(selectedSupplier._id)
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


export default AllSuppliers;
