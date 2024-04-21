import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link } from "react-router-dom"; // Import Link for routing

// Import images for the functionalities
import createIcon from "../assets/createicon.png";
import allProductsIcon from "../assets/listIcon.jpg";
import addLeaveIcon from "../assets/addleaveIcon.png";

const ProductManagerHome = () =>{
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    
    useEffect(()=>{
        !user && navigate("/login", {replace:true });
    },[]);

    return (
        <>
            <div>
                <h2>Welcome, {user ? user.name : null}!</h2>
                <br />
                <Stack direction="horizontal" spacing={3}>
                    {/* Display smaller images for the functionalities */}
                    <Link to="/createproducts">
                        <img src={createIcon} alt="Create" style={{ width: '150px', height: '150px' }} />
                        <Button variant="primary">Add Product</Button>
                    </Link>
                    <Link to="/allproducts">
                        <img src={allProductsIcon} alt="All Products" style={{ width: '150px', height: '150px' }} />
                        <Button variant="secondary">All Products</Button>
                    </Link>
                    <Link to="/createleave">
                        <img src={addLeaveIcon} alt="Add Leave" style={{ width: '150px', height: '150px' }} />
                        <Button variant="info">Add Leave</Button>
                    </Link>
                </Stack>
            </div>
            <br />
            
        </>
    );
};

export default ProductManagerHome;
