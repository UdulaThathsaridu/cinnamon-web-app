import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
    // State to hold the order details
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve order details from localStorage
        const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
        console.log("Stored Order Details:", storedOrderDetails); // Log the stored order details
        if (storedOrderDetails) {
            setOrderDetails(storedOrderDetails.payment); // Access the "payment" object from the stored data
        }
    }, []);

    const handleGoToProducts = () => {
         // Remove order details from localStorage
         localStorage.removeItem("orderDetails");
        // Navigate to the customer product page
        navigate("/customer-product");
    };

    return (
        <div className="container">
            <h2>Order Details</h2>
            {orderDetails ? (
                <div>
                    <p>Order ID: {orderDetails._id}</p>
                    <p>Total Price: ${orderDetails.cart.reduce((total, item) => total + item.total, 0)}</p> {/* Calculate total price */}
                    <p>Order Date: {new Date(orderDetails.expiryDate).toLocaleString()}</p>
                    <h3>Products:</h3>
                    <ul>
                        {orderDetails.cart.map((item, index) => (
                            <li key={index}>
                                <p>Product Name: {item.name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price per unit: ${item.price}</p>
                                <p>Total Price: ${item.total}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleGoToProducts}>Go to Customer Products</button>
                </div>
            ) : (
                <p>No order details available</p>
            )}
        </div>
    );
};

export default OrderSummary;
