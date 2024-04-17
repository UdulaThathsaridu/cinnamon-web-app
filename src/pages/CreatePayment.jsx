import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";


const CreatePayment = () => {
    const { toast } = useContext(ToastContext);
    const location = useLocation();
    const { cart } = location.state || {};
    const [paymentDetails, setPaymentDetails] = useState({
        name: "",
        number: "",
        expiryDate: "",
        cvv: "",
        issuingBank: ""
    });

    const navigate = useNavigate();
 // Empty dependency array to run only once when component mounts

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('http://localhost:4000/api/payments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ ...paymentDetails, cart, userId: localStorage.getItem("id"), totalPrice: 123  }),
            });
            const result = await res.json();
            if (!result.error) {

                localStorage.setItem("orderDetails", JSON.stringify(result));
                toast.success(`Payment Successful`);
                localStorage.setItem("lastCart", JSON.stringify(cart));
                localStorage.removeItem("cart");
                setPaymentDetails({ name: "", number: "", expiryDate: "", cvv: "", issuingBank: "" });
                navigate("/order-summary",{state:{cart}});
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            toast.error('An error occurred while processing your payment');
        }
    };

    return (
        <div className="container">
            <h2>Add Payment Details</h2>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3">
                    <Form.Label>CardHolder Name</Form.Label>
                    <Form.Control id="name" name="name" type="text"
                        placeholder="Enter CardHolder Name" value={paymentDetails.name} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="number">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control id="number" name="number" type="number"
                        placeholder="Enter Card Number" value={paymentDetails.number} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control id="expiryDate" name="expiryDate" type="date"
                        placeholder="Enter Expiry Date" value={paymentDetails.expiryDate} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control id="cvv" name="cvv" type="number"
                        placeholder="Enter CVV" value={paymentDetails.cvv} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="issuingBank">
                    <Form.Label>Issuing Bank </Form.Label>
                    <Form.Control id="issuingBank" name="issuingBank" type="text"
                        placeholder="Enter Issuing Bank" value={paymentDetails.issuingBank} onChange={handleInputChange} required />
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Add Payment Details
                </Button>
            </Form>
        </div>
    );
};

export default CreatePayment;
