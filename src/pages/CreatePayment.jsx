import React, { useContext, useState } from "react";
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
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!paymentDetails.name) {
            formIsValid = false;
            errors.name = "Name is required";
        }

        if (!paymentDetails.number) {
            formIsValid = false;
            errors.number = "Card number is required";
        } else if (!/^\d{16}$/.test(paymentDetails.number)) {
            formIsValid = false;
            errors.number = "Please enter a valid 16-digit card number";
        }

        if (!paymentDetails.expiryDate) {
            formIsValid = false;
            errors.expiryDate = "Expiry date is required";
        }

        if (!paymentDetails.cvv) {
            formIsValid = false;
            errors.cvv = "CVV is required";
        } else if (!/^\d{3}$/.test(paymentDetails.cvv)) {
            formIsValid = false;
            errors.cvv = "Please enter a valid 3-digit CVV";
        }

        if (!paymentDetails.issuingBank) {
            formIsValid = false;
            errors.issuingBank = "Issuing bank is required";
        }

        setFormErrors(errors);
        return formIsValid;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
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
        }
    };

    return (
        <div className="container">
            <h2>Add Payment Details</h2>
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>CardHolder Name</Form.Label>
                    <Form.Control name="name" type="text"
                        placeholder="Enter CardHolder Name" value={paymentDetails.name} onChange={handleInputChange} required />
                    {formErrors.name && <Form.Text className="text-danger">{formErrors.name}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="number">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control name="number" type="number"
                        placeholder="Enter Card Number" value={paymentDetails.number} onChange={handleInputChange} required />
                    {formErrors.number && <Form.Text className="text-danger">{formErrors.number}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="expiryDate">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control name="expiryDate" type="date"
                        placeholder="Enter Expiry Date" value={paymentDetails.expiryDate} onChange={handleInputChange} required />
                    {formErrors.expiryDate && <Form.Text className="text-danger">{formErrors.expiryDate}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control name="cvv" type="number"
                        placeholder="Enter CVV" value={paymentDetails.cvv} onChange={handleInputChange} required />
                    {formErrors.cvv && <Form.Text className="text-danger">{formErrors.cvv}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="issuingBank">
                    <Form.Label>Issuing Bank </Form.Label>
                    <Form.Select name="issuingBank" value={paymentDetails.issuingBank} onChange={handleInputChange} required>
                        <option value="">Select Issuing Bank</option>
                        <option value="Bank A">BOC</option>
                        <option value="Bank B">HNB</option>
                        <option value="Bank C">Pepols' Bank</option>
                        <option value="Bank C">Commercial</option>
                    </Form.Select>
                    {formErrors.issuingBank && <Form.Text className="text-danger">{formErrors.issuingBank}</Form.Text>}
                </Form.Group>
                <Button id="btn" name="submit" variant="primary" type="submit">
                    Add Payment Details
                </Button>
            </Form>
        </div>
    );
};

export default CreatePayment;