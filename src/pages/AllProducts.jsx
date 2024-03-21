import { useContext, useEffect,useState } from "react";
import React from "react";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";

const AllProducts = () =>{
    const {toast}= useContext(ToastContext);
    const [showModal,setShowModal] = useState(false);
    const [loading,setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products,setProducts] = useState([]);
    const [searchInput,setSearchInput] = useState("");
  

    useEffect(() => {
        async function fetchProducts(){
            setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/products',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setProducts(result.products);
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
        fetchProducts();
    }, []);

    const deleteProducts = async (id) => {
        if(window.confirm("Are you sure you want to delete this Product?")){
            try {
                const res= await fetch(`http://localhost:4000/api/products/${id}`,{
                    method:"DELETE",
                    headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`,}
                })
                const result = await res.json();
                if(!result.error){
    
                    toast.success("Deleted Product");
                    setShowModal(false);
                    setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/products',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                }
            });
            const result = await res.json();
            if(!result.error){
               setProducts(result.products);
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

      const newSearchProduct = products.filter((product) => 
      product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(newSearchProduct);

      setProducts(newSearchProduct);

    };
  

    return (<>This is the All Products page
    <br></br>
    <a href="/allproducts" className="btn btn-danger my-2">Reload Products</a>
    {loading ? <Spinner splash="Loading Products..." /> : (
        (products.length == 0 ? <h3>No Products Added</h3>:<>
        <form className="d-flex" onSubmit={handleSearchSubmit}>

        <input
         type="text" 
         name="searchInput" 
         id="searchInput"  
         className="form-control my-2" 
         placeholder="Search Product"
         value={searchInput}
         onChange={(e) => setSearchInput(e.target.value)}
         />
         <Button id="Search"  variant="primary" type="submit" className="btn btn-info mx-2">
          Search</Button>{' '}
         </form>

        <p>Total No of Products:{products.length}</p>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {loading === false && products.map((product) =>(
               <tr key={product._id} onClick={()=> {
                setSelectedProduct({});
                setSelectedProduct(product);
                setShowModal(true)}}>
               <td>{product.name}</td>
               <td>{product.productId}</td>
               <td>{product.quantity}</td>
               <td>{product.price}</td>
               <td>{product.description}</td>
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
          {selectedProduct && <Modal.Title>Product Details</Modal.Title>}
        </Modal.Header>

        <Modal.Body>
         { selectedProduct &&(
            <>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Product ID:</strong>{selectedProduct.productId}</p>
          <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
          <p><strong>Price:</strong>{selectedProduct.price}</p>
          <p><strong>Description:</strong>{selectedProduct.description}</p>
          </>)}
        </Modal.Body>

        <Modal.Footer>
        <Link 
        className="btn btn-info"
        to={`/editproducts/${selectedProduct?._id}`}>
            Edit</Link>
        <Button id="btn btn-danger" variant="primary" onClick={()=>{
           deleteProducts(selectedProduct._id)
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


export default AllProducts;
