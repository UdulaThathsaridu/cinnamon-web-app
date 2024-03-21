import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllInventories = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [inventories,setInventories] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchInventories(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/inventories',{

                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setInventories(result.inventories);
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
        fetchInventories();
    }, [toast]);

    const deleteInventory = async (id) => {
        if(window.confirm("Are you sure you want to delete this inventory item?")){
            try {
                const res= await fetch(`http://localhost:4000/api/inventories/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Inventory item");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/inventories',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setInventories(result.inventories);
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
    
      console.log("Original inventories:", inventories);
    
      const newSearchInventory = inventories.filter((inventory) => 
        inventory.productname && inventory.productname.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log("Filtered inventories:", newSearchInventory);
    
      setInventories(newSearchInventory);
    };
    

    return (<>This is the All Inventory page
    <br></br>
    <a href="/allinventories" className="btn btn-danger my-2">Reload Inventories</a>
    {loading ? <Spinner splash="Loading Inventories..." /> : (
        (inventories.length == 0 ? <h3>No Inventories Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Inventory"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Inventories:{inventories.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Item Number</th>
            <th>Supplier Name</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && inventories.map((inventory) =>(
               <tr key={inventory._id} onClick={()=> {
                setSelectedInventory({});
                setSelectedInventory(inventory);
                setShowModal(true)}}>
               <td>{inventory.productname}</td>
               <td>{inventory.sku}</td>
               <td>{inventory.quantity}</td>
               <td>{inventory.unitprice}</td>
               <td>{inventory.itemno}</td>
               <td>{inventory.suppliername}</td>
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
          {selectedInventory && <Modal.Title>Inventory Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedInventory &&(
            <>
            <p><strong>ProductName:</strong> {selectedInventory.productname}</p>
          <p><strong>SKU:</strong>{selectedInventory.sku}</p>
          <p><strong>Quantity:</strong> {selectedInventory.quantity}</p>
          <p><strong>UnitPrice:</strong>{selectedInventory.unitprice}</p>
          <p><strong>ItemNo:</strong>{selectedInventory.itemno}</p>
          <p><strong>SupplierName:</strong>{selectedInventory.suppliername}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editinventory/${selectedInventory?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteInventory(selectedInventory._id)
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


export default AllInventories;
