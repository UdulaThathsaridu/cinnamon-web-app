import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Table, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import ToastContext from "../context/ToastContext";

const AllInventories = () => {
    const { toast } = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const [inventories, setInventories] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        async function fetchInventories() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/api/inventories', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                const result = await res.json();
                if (!result.error) {
                    setInventories(result.inventories);
                } else {
                    console.log(result);
                    toast.error("Failed to fetch inventories");
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch inventories");
            } finally {
                setLoading(false);
            }
        }
        fetchInventories();
    }, [toast]);

    const deleteInventory = async (id) => {
        if (window.confirm("Are you sure you want to delete this inventory item?")) {
            try {
                const res = await fetch(`http://localhost:4000/api/inventories/${id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const result = await res.json();
                if (!result.error) {
                    toast.success("Deleted Inventory item");
                    setShowModal(false);
                    const updatedInventories = inventories.filter(inventory => inventory._id !== id);
                    setInventories(updatedInventories);
                } else {
                    toast.error(result.error);
                }
            } catch (err) {
                console.log(err);
                toast.error("Failed to delete inventory item");
            }
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const newSearchInventory = inventories.filter((inventory) =>
            inventory.productname && inventory.productname.toLowerCase().includes(searchInput.toLowerCase())
        );
        setInventories(newSearchInventory);
    };

    const generatePDFReport = () => {
        generatePDF(inventories);
    };

    const generatePDF = (inventories) => {
        const doc = new jsPDF();
        doc.text("Inventory Report", 10, 10);
        let yPos = 20;
        inventories.forEach((inventory, index) => {
            yPos += 10;
            doc.text(`${index + 1}. Product Name: ${inventory.productname}`, 10, yPos);
            doc.text(`   SKU: ${inventory.sku}`, 10, yPos + 5);
            doc.text(`   Quantity: ${inventory.quantity}`, 10, yPos + 10);
            doc.text(`   Unit Price: ${inventory.unitprice}`, 10, yPos + 15);
            doc.text(`   Item Number: ${inventory.itemno}`, 10, yPos + 20);
            doc.text(`   Supplier Name: ${inventory.suppliername}`, 10, yPos + 25);
            yPos += 30;
        });

        doc.save("inventory_report.pdf");
    };

    return (
        <>
            <h2>All Inventory Items</h2>
            <Button onClick={generatePDFReport}>Generate PDF Report</Button>
            <br /><br />
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : inventories.length === 0 ? (
                <h3>No Inventories Added</h3>
            ) : (
                <>
                    <form className="d-flex" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            name="searchInput"
                            id="searchInput"
                            className="form-control my-2"
                            placeholder="Search Inventory"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <Button variant="primary" type="submit" className="btn btn-info mx-2">
                            Search
                        </Button>
                    </form>
                    <p>Total No of Inventories: {inventories.length}</p>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Item Number</th>
                                <th>Supplier Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventories.map((inventory) => (
                                <tr key={inventory._id} onClick={() => {
                                    setSelectedInventory(inventory);
                                    setShowModal(true);
                                }}>
                                    <td>{inventory.productname}</td>
                                    <td>{inventory.sku}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>{inventory.unitprice}</td>
                                    <td>{inventory.itemno}</td>
                                    <td>{inventory.suppliername}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inventory Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedInventory && (
                            <>
                                <p><strong>ProductName:</strong> {selectedInventory.productname}</p>
                                <p><strong>SKU:</strong>{selectedInventory.sku}</p>
                                <p><strong>Quantity:</strong> {selectedInventory.quantity}</p>
                                <p><strong>UnitPrice:</strong>{selectedInventory.unitprice}</p>
                                <p><strong>ItemNo:</strong>{selectedInventory.itemno}</p>
                                <p><strong>SupplierName:</strong>{selectedInventory.suppliername}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link className="btn btn-info" to={`/editinventory/${selectedInventory?._id}`}>Edit</Link>
                        <Button variant="primary" onClick={() => deleteInventory(selectedInventory._id)}>Delete</Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default AllInventories;