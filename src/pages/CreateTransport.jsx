import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

const CreateTransport = () => {
    const [vehicleDetails, setVehicleDetails] = useState({
        vehicle: "",
        model: "",
        status: "",
        last_inspection: "",
        next_inspection: "",
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch('http://localhost:4000/api/vehicles', {
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
                console.log(`Created [${values.vehicle}]`);
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
            <h2>Add Vehicles</h2>
            <Formik
                initialValues={vehicleDetails}
                validate={values => {
                    const errors = {};

                    if (!values.vehicle.trim()) {
                        errors.vehicle = "Vehicle name is required";
                    } else if (!/^[a-zA-Z]+$/.test(values.vehicle.trim())) {
                      errors.vehicle = "Vehicle name can only contain letters";
                  }

                    if (!values.model.trim()) {
                        errors.model = "Vehicle model is required";
                    } else if (!/^[a-zA-Z]+$/.test(values.model.trim())) {
                      errors.model = "Vehicle model can only contain letters";
                  }

                    if (!values.status.trim()) {
                        errors.status = "Vehicle status is required";
                    } else if (!/^[a-zA-Z]+$/.test(values.status.trim())) {
                      errors.status = "Vehicle status can only contain letters";
                  }

                    if (!values.last_inspection.trim()) {
                        errors.last_inspection = "Last inspection date is required";
                    }

                    if (!values.next_inspection.trim()) {
                        errors.next_inspection = "Next inspection date is required";
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
                            <Form.Label>Vehicle Name</Form.Label>
                            <Form.Control
                                name="vehicle"
                                type="text"
                                placeholder="Enter Vehicle Name"
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
                            <Form.Label>Vehicle Model</Form.Label>
                            <Form.Control
                                name="model"
                                type="text"
                                placeholder="Enter Vehicle Model"
                                value={values.model}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.model && !!errors.model}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.model}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Vehicle Status</Form.Label>
                            <Form.Control
                                name="status"
                                type="text"
                                placeholder="Enter Vehicle Status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.status && !!errors.status}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.status}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Inspection</Form.Label>
                            <Form.Control
                                name="last_inspection"
                                type="date"
                                value={values.last_inspection}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.last_inspection && !!errors.last_inspection}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.last_inspection}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Next Inspection</Form.Label>
                            <Form.Control
                                name="next_inspection"
                                type="date"
                                value={values.next_inspection}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.next_inspection && !!errors.next_inspection}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.next_inspection}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting' : 'Add Vehicle'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateTransport;
