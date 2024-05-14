import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

const CreateTransport = () => {
    const [vehicleDetails, setVehicleDetails] = useState({
        vehicle: "",
        vnumber: "",
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

                  if (!values.vnumber.trim()) {
                    errors.vnumber = "Vehicle number is required";
                } else if (!/^[A-Z][A-Za-z0-9]{8}\d$/.test(values.vnumber.trim()) || values.vnumber.trim().length !== 10) {
                    errors.vnumber = "Invalid vehicle number. It should start with a capital letter, followed by 8 alphanumeric characters, and end with a digit. It must be 10 characters long.";
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
                } else {
                    const today = new Date();
                    const lastInspectionDate = new Date(values.last_inspection);
                    if (lastInspectionDate > today) {
                        errors.last_inspection = "Last inspection date cannot be in the future";
                    }
                }

                if (!values.next_inspection.trim()) {
                    errors.next_inspection = "Next inspection date is required";
                } else {
                    const today = new Date();
                    const nextInspectionDate = new Date(values.next_inspection);
                    if (nextInspectionDate <= today) {
                        errors.next_inspection = "Next inspection date must be after today";
                    }
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
    <Form.Label>Vehicle Type</Form.Label>
    <Form.Control
        as="select" // Use select input
        name="vehicle"
        value={values.vehicle} // Corrected value prop
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={touched.vehicle && !!errors.vehicle}
    >
        <option value="">- Select Vehicle -</option>
        <option value="van">Van</option>
        <option value="car">Car</option>
        <option value="truck">Truck</option>
        <option value="lorry">Lorry</option>
    </Form.Control>
    <Form.Control.Feedback type="invalid">
        {errors.vehicle}
    </Form.Control.Feedback>
</Form.Group>
<Form.Group className="mb-3">
                            <Form.Label>Vehicle Number</Form.Label>
                            <Form.Control
                                name="vnumber"
                                type="text"
                                placeholder="Enter Vehicle Number"
                                value={values.vnumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.vnumber && !!errors.vnumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.vnumber}
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
                                as="select" // Use select input
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.status && !!errors.status}
                            >
                                <option value="">-Select Status-</option>
                                <option value="good">Good</option>
                                <option value="bad">Bad</option>
                            </Form.Control>
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
