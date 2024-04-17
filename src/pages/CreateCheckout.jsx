import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateCheckout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { toast } = useContext(ToastContext);
    const { cart } = location.state || {};
    const [checkoutDetails, setCheckoutDetails] = useState({
        name: localStorage.getItem("name"),
        address: localStorage.getItem("address"),
        city: "",
        country: "",
        zip: "",
        phone: localStorage.getItem("phone"),
        email: localStorage.getItem("email"),
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCheckoutDetails({ ...checkoutDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch('http://localhost:4000/api/checkouts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(checkoutDetails),
        });
        const result = await res.json();
        if (!result.error) {
            toast.success(`Created [${checkoutDetails.name}]`);
            setCheckoutDetails({ name: localStorage.getItem("name"), address: localStorage.getItem("address"), city: "", country: "", zip: "", phone: localStorage.getItem("phone"), email: localStorage.getItem("email") });
            navigate(`/createpayment`, { state: { cart } });
        } else {
            toast.error(result.error);
        }
    };

    return (
        <>
            <h2>Checkout Details</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control id="name" name="name" type="text"
                        placeholder="Enter Customer Name" value={checkoutDetails.name} onChange={handleInputChange} required disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Customer Address</Form.Label>
                    <Form.Control id="address" name="address" type="text"
                        placeholder="Enter Customer Address" value={checkoutDetails.address} onChange={handleInputChange} required disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control id="city" name="city" type="text"
                        placeholder="Enter City" value={checkoutDetails.city} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control id="country" name="country" type="text"
                        placeholder="Enter Country" value={checkoutDetails.country} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="zip">
                    <Form.Label>ZIP</Form.Label>
                    <Form.Control id="zip" name="zip" type="number"
                        placeholder="Enter zip" value={checkoutDetails.zip} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control id="phone" name="phone" type="number"
                        placeholder="Enter phone" value={checkoutDetails.phone} onChange={handleInputChange} required disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id="email" name="email"
                        placeholder="Enter email" value={checkoutDetails.email} onChange={handleInputChange} required disabled />
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Place Order
                </Button>
            </Form>
        </>
    );
};

export default CreateCheckout;
