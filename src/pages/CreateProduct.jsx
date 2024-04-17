import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ToastContext from "../context/ToastContext";

const CreateProduct = () => {
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState({
        name: "",
        productId: "",
        quantity: "",
        price: "",
        description: "",
        image: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProductDetails({ ...productDetails, image: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', productDetails.name);
        formData.append('productId', productDetails.productId);
        formData.append('quantity', productDetails.quantity);
        formData.append('price', productDetails.price);
        formData.append('description', productDetails.description);
        formData.append('image', productDetails.image);

        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: formData
            });

            const result = await res.json();
            if (!result.error) {
                toast.success(`Created [${productDetails.name}]`);
                setProductDetails({ name: "", productId: "", quantity: "", price: "", description: "", image: null });
            } else {
                toast.error(result.error);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to create product");
        }
    };

    return (
        <>
            <h2>Add Products</h2>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter Product Name" value={productDetails.name} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="productId">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control name="productId" type="text" placeholder="Enter Product ID" value={productDetails.productId} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control name="quantity" type="number" placeholder="Quantity" value={productDetails.quantity} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="price" type="text" placeholder="Enter Price" value={productDetails.price} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={5} placeholder="Enter description" value={productDetails.description} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control name="image" type="file" accept="image/*" onChange={handleImageChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">Add Product</Button>
            </Form>
        </>
    );
};

export default CreateProduct;