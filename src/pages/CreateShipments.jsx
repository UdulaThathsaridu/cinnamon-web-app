import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

const CreateShipments = () => {
    const [shipDetails, setShipDetails] = useState({
        route: "",
        supplier: "",
        date: "",
        vehicle: "",
        max_distance: "",
        speed_limit: "",
        arrival: "",
        driver: "",
        note: "",
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch('http://localhost:4000/api/shipments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            });

            const result = await res.json();
            if (!result.error) {
                // Handle success
                console.log(`Created [${values.route}]`);
                resetForm();
            } else {
                // Handle error
                console.error(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2>Add Shipment</h2>
            <Formik
                initialValues={shipDetails}
                validate={values => {
                    const errors = {};

                    if (!values.route.trim()) {
                        errors.route = "Route is required";
                    }

                    if (!values.supplier.trim()) {
                        errors.supplier = "Supplier is required";
                    }

                    if (!values.date.trim()) {
                        errors.date = "Date is required";
                    }

                    if (!values.vehicle.trim()) {
                        errors.vehicle = "Vehicle is required";
                    }

                    if (!values.max_distance.trim()) {
                        errors.max_distance = "Max distance is required";
                    }

                    if (!values.speed_limit.trim()) {
                        errors.speed_limit = "Speed limit is required";
                    }

                    if (!values.arrival.trim()) {
                        errors.arrival = "Arrival is required";
                    }

                    if (!values.driver.trim()) {
                        errors.driver = "Driver is required";
                    }

                    if (!values.note.trim()) {
                        errors.note = "Note is required";
                    }

                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Route</Form.Label>
                            <Form.Control
                                name="route"
                                type="text"
                                placeholder="Enter Route"
                                value={values.route}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.route && !!errors.route}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.route}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Supplier</Form.Label>
                            <Form.Control
                                name="supplier"
                                type="text"
                                placeholder="Enter Supplier"
                                value={values.supplier}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.supplier && !!errors.supplier}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.supplier}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                name="date"
                                type="date"
                                value={values.date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.date && !!errors.date}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle</Form.Label>
                            <Form.Control
                                name="vehicle"
                                type="text"
                                placeholder="Enter Vehicle"
                                value={values.vehicle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.vehicle && !!errors.vehicle}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.vehicle}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Max Distance</Form.Label>
                            <Form.Control
                                name="max_distance"
                                type="text"
                                placeholder="Enter Max Distance"
                                value={values.max_distance}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.max_distance && !!errors.max_distance}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.max_distance}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Speed Limit</Form.Label>
                            <Form.Control
                                name="speed_limit"
                                type="text"
                                placeholder="Enter Speed Limit"
                                value={values.speed_limit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.speed_limit && !!errors.speed_limit}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.speed_limit}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Arrival</Form.Label>
                            <Form.Control
                                name="arrival"
                                type="date"
                                value={values.arrival}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.arrival && !!errors.arrival}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.arrival}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Driver</Form.Label>
                            <Form.Control
                                name="driver"
                                type="text"
                                placeholder="Enter Driver"
                                value={values.driver}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.driver && !!errors.driver}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.driver}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Note</Form.Label>
                            <Form.Control
                                name="note"
                                type="text"
                                placeholder="Enter Note"
                                value={values.note}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.note && !!errors.note}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.note}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting' : 'Add Shipment'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateShipments;
