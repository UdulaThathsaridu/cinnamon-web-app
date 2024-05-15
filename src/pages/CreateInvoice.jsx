import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import ToastContext from "../context/ToastContext";

const CreateInvoice = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  return (
    <>
      <h2>Add Invoice Details</h2>
      <Formik
        initialValues={{
          id: "",
          cname: "",
          orderid: "",
          orderedDate: "",
          tamount: ""
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string().required("ID is required"),
          cname: Yup.string().required("Customer Name is required"),
          orderid: Yup.number().required("Order ID is required"),
          orderedDate: Yup.date().required("Ordered Date is required"),
          tamount: Yup.number().required("Total Amount is required")
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            const res = await fetch("http://localhost:4000/api/invoices", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify(values)
            });
            const result = await res.json();
            if (!result.error) {
              toast.success(`Created [${values.name}]`);
              resetForm();
            } else {
              toast.error(result.error);
            }
            setSubmitting(false);
          }, 400);
        }}
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
              <Form.Label>ID</Form.Label>
              <Form.Control
                id="id"
                name="id"
                type="text"
                placeholder="Enter Invoice ID"
                value={values.id}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.id && errors.id}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cname">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                id="cname"
                name="cname"
                type="text"
                placeholder="Enter Customer Name"
                value={values.cname}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.cname && errors.cname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cname}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="orderid">
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                id="orderid"
                name="orderid"
                type="number"
                placeholder="Enter Order ID"
                value={values.orderid}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.orderid && errors.orderid}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orderid}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="orderedDate">
              <Form.Label>Ordered Date</Form.Label>
              <Form.Control
                id="orderedDate"
                name="orderedDate"
                type="date"
                placeholder="Enter Ordered Date"
                value={values.orderedDate}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.orderedDate && errors.orderedDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orderedDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="tamount">
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                id="tamount"
                name="tamount"
                type="number"
                placeholder="Enter Total Amount"
                value={values.tamount}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.tamount && errors.tamount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tamount}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              id="btn"
              name="submit"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Add Invoice Details
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateInvoice;