import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Modal from "react-bootstrap/Modal";

//Toast
import { toast } from "react-toastify";

//Form validation
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

//define the Yup validation schema for SIGNUP
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .matches(
      /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm,
      "Alphanumeric, dot, underscore, and dash only"
    )
    .required("Required"),

  email: Yup.string().trim().email("Invalid email").required("Required"),
  password: Yup.string()
    .trim()
    .min(7, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  changepassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both passwords need to be the same"
    ),
  }),
});

function RegisterGuestModal({ handleRegisterGuestClose, showRegisterGuest }) {
  const [signupError, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    handleRegisterGuestClose();
    navigate("/login");
  };

  const { registerGuest } = useAuth();

  return (
    <Modal
      show={showRegisterGuest}
      onHide={handleRegisterGuestClose}
      dialogClassName="modalStyle"
    >
      <div className="eightBitForm">
        <div className="eightBitContainer">
          <div className="regTopper">
            <span className="pointer" onClick={handleRegisterGuestClose}>
              X
            </span>
          </div>
          <div className="eightBitAlign">
            <h2>Guest {">"} Player</h2>
            <Formik
              initialValues={{
                password: "",
                changepassword: "",
                username: "",
                email: "",
                fName: "",
                lName: "",
              }}
              validationSchema={SignupSchema}
              validateOnChange={false}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                //using Yup to cast the validated inputs so we can send that to the db
                const castValues = SignupSchema.cast(values);

                resetForm();
                setSubmitting(false);
                try {
                  setError("");
                  setLoading(true);

                  //we try to authenticate the user
                  // if the user exists, signupSuccess returns false
                  const signupSuccess = await registerGuest(
                    castValues.email,
                    castValues.password,
                    castValues.username
                  );

                  if (signupSuccess.status) navigate("/landing");
                  else {
                    toast.error(signupSuccess.reason);
                    throw new Error("user already exists");
                  }
                } catch (error) {
                  console.log(error);
                  setError("failed to create account: ", error);
                }
                setLoading(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className="row g-3 w-100">
                  <Form.Group controlId="formEmail" className="mb-0">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="email"
                      autoComplete="email"
                      autoCapitalize="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={touched.email && errors.email ? "error" : null}
                    />
                    {errors.email && touched.email ? (
                      <div className="error-message">{errors.email}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="formUsernameRegister" className="mb-0">
                    <Form.Label>Username</Form.Label>

                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      autoComplete="username"
                      autoCapitalize="off"
                      className={
                        touched.username && errors.username ? "error" : null
                      }
                    />
                    {errors.username && touched.username ? (
                      <div className="error-message">{errors.username}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="formPasswordRegister" className="mb-0">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      autoComplete="new-password"
                      className={
                        touched.password && errors.password ? "error" : null
                      }
                    />
                    {errors.password && touched.password ? (
                      <div className="error-message">{errors.password}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    controlId="formChangePasswordRegister"
                    className="mb-0"
                  >
                    <Form.Label>Confirm Password</Form.Label>

                    <Form.Control
                      type="password"
                      name="changepassword"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.changepassword}
                      autoComplete="off"
                      className={
                        touched.changepassword && errors.changepassword
                          ? "error"
                          : null
                      }
                    />
                    {errors.changepassword && touched.changepassword ? (
                      <div className="error-message">
                        {errors.changepassword}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group controlId="submit" className="col-12">
                    <Button
                      type="submit"
                      variant="primary"
                      className="my-4 w-100"
                      disabled={isSubmitting}
                    >
                      Sign Up
                    </Button>
                  </Form.Group>
                </Form>
              )}
            </Formik>
            <p>Already Have An Account?</p>
            <p>
              <span onClick={goToLogin}>Log In</span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterGuestModal;
