import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateSupplier = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Supplier Name is required"),
      email: Yup.string()
          .trim()
          .email("Invalid email format")
          .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
          .required("Email is required"),
      registeredDate: Yup.date().required("Registered date is required"),
      location: Yup.string().required("Location is required"),
  });

    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        const res = await fetch('http://localhost:4000/api/suppliers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(values),
        });

        const result = await res.json();
        if (!result.error) {
            toast.success(`Created [${values.name}]`);
            resetForm(); // Reset form fields
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div>
            <h2>Add Suppliers</h2>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    registeredDate: "",
                    location: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name">Supplier Name</label>
                            <Field name="name" type="text" placeholder="Enter Supplier Name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Supplier Email address</label>
                            <Field name="email" type="email" placeholder="Enter Supplier email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="registeredDate">Registered Date to Our Company</label>
                            <Field name="registeredDate" type="date" className="form-control" />
                            <ErrorMessage name="registeredDate" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location">Supplier Location</label>
                            <Field name="location" type="text" placeholder="Enter Supplier Location" className="form-control" />
                            <ErrorMessage name="location" component="div" className="text-danger" />
                        </div>

                        <Button type="submit" disabled={isSubmitting} variant="primary">
                            Add Supplier
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateSupplier;
