import { useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const TransportManagerHome = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        !user && navigate("/login", { replace: true });
    }, [user, navigate]);

    return user && (
       
        <>
            <h2 className="text-center mt-4">Welcome, {user.name}!</h2>
            <Row className="gx-4 mt-5 justify-content-between">
                {/* First Row */}
                <Col xs={12} sm={6} md={4} className="text-center mb-4">
                    <Link to="/createtransports">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={createTransportImage} alt="Create Transport" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">Add Transport</p>
                </Col>
                <Col xs={12} sm={6} md={4} className="text-center mb-4">
                    <Link to="/alltransports">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={allTransportsImage} alt="All Transports" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">All Transports</p>
                </Col>
                <Col xs={12} sm={6} md={4} className="text-center mb-4">
                    <Link to="/createshipments">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={createShipmentImage} alt="Create Shipment" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">Add Shipment</p>
                </Col>
                {/* Second Row */}
                <Col xs={12} sm={6} md={4} className="text-center mb-4">
                    <Link to="/allshipments">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={allShipmentsImage} alt="All Shipments" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">All Shipments</p>
                </Col>
                <Col xs={12} sm={6} md={4} className="text-center mb-4">
                    <Link to="/contactinventory">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={contactInventory} alt="contact" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">Contact Inventory</p>
                </Col>
                <Col xs={12} sm={6} md={4} className="text-center mb-4">
                    <Link to="/createleave">
                        <Button variant="primary" className="image-button" style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <img src={addLeaveImage} alt="Add Leave" className="img-fluid" style={{ width: '150px', height: '150px' }} />
                        </Button>
                    </Link>
                    <p className="text-center mt-2">Add Leave</p>
                </Col>
            </Row>
        </>
    );
}

export default TransportManagerHome;
