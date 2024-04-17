import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import customerhomepic from "../assets/IMG_3025.jpg";
import barkoil from '../assets/a1-2.jpg';
import mosquitoil from '../assets/a1-5.jpg';
import herbalbalm from '../assets/a1-3.jpg';

const CustomerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
        }
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="lead-mb-4">Welcome, {user ? user.name : "Guest"}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={customerhomepic} alt="Mandri home pic" className="img-fluid" />
                    <h2 className="mt-4">Our Products</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={herbalbalm} alt="Product 1" className="img-fluid"/>
                        <p>Cinnamon Herbal Balm</p>
                        </div>
                        <div className="col-md-4">
                            <img src={mosquitoil} alt="Product 2" className="img-fluid"/>
                            <p>Cinnamon Mosquito Oil</p>
                        </div>
                        <div className="col-md-4">
                            <img src={barkoil} alt="Product 3" className="img-fluid"/>
                            <p>Cinnamon Bark Oil</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>Our Business</h2>
                    <p>
                        Sri Lanka is naturally gifted for producing the best class Cinnamon, Black Pepper and Essential Oils. Cinnamon from Sri Lanka is commonly known as Ceylon Cinnamon. At Mandri Lanka, we provide the authentic Ceylon Cinnamon and Black Pepper at its pure grade to the world. We work with several known growers, hand pick the harvest from the fields and process at dedicated Cinnamon and Pepper Processing Centres. We do this to ensure that the quality is maintained across all channels until it reaches our valuable customers. We focus on Ceylon Cinnamon, Black Pepper Corn and Essential Oils. We ensure to stamp on our purity and expertise for what we offer you. This is our philosophy.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CustomerHome;
