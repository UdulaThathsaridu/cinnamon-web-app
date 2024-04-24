import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";


const ContactTransport = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [mailDetails, setMailDetails] = useState({
    address: "",
    productName: "",
    productQuantity: "",
    pickUpDate: "",
    pickUpTime: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMailDetails({ ...mailDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:4000/api/transportmailsupp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(mailDetails),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`Mail sent successfully`);
      setMailDetails({
        address: "",
        productName: "",
        productQuantity: "",
        pickUpDate: "",
        pickUpTime: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Contact Supplier Manager</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter address"
            value={mailDetails.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="productName"
            type="text"
            placeholder="Enter product name"
            value={mailDetails.productName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            name="productQuantity"
            type="number"
            placeholder="Enter product quantity"
            value={mailDetails.productQuantity}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pick Up Date</Form.Label>
          <Form.Control
            name="pickUpDate"
            type="date"
            value={mailDetails.pickUpDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pick Up Time</Form.Label>
          <Form.Control
            name="pickUpTime"
            type="time"
            value={mailDetails.pickUpTime}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send mail
        </Button>
      </Form>
    </>
  );
};

export default ContactTransport;
