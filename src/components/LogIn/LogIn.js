import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Formik } from "formik";
import * as Yup from "yup";

//define the Yup validation schema for LOGIN
const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email").required("Required"),
  password: Yup.string()
    .trim()
    .min(7, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function LogIn({ setShowSidebar }) {
  const [loginError, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (loginError !== "") toast.error(loginError);

  const { login, loginAsGuest } = useAuth();

  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await loginAsGuest();
      setShowSidebar(true);
      navigate("/landing");
    } catch (error) {
      setError("failed to log in");
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Login</h2>
        <div>
          <Formik
            initialValues={{
              password: "",
              email: "",
            }}
            validationSchema={LoginSchema}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              const castValues = LoginSchema.cast(values);

              resetForm();
              setSubmitting(false);

              try {
                setError("");
                setLoading(true);
                await login(castValues.email, castValues.password);
                setShowSidebar(true);
                navigate("/landing");
              } catch (error) {
                setError("failed to log in");
              }
              setLoading(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="me@web.com"
                  autoFocus
                  onChange={handleChange}
                  value={values.email}
                  autoComplete="email"
                  autoCapitalize="off"
                  className={touched.email && errors.email ? "error" : null}
                />
                {errors.email && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  value={values.password}
                  autoComplete="current-password"
                  autoCapitalize="off"
                  className={
                    touched.password && errors.password ? "error" : null
                  }
                />
                {errors.password && touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
                <button type="submit" variant="primary" disabled={isSubmitting}>
                  Sign In
                </button>
              </form>
            )}
          </Formik>
          <hr />
          <button className="form-button" type="button" onClick={guestLogin}>
            Play As Guest
          </button>
        </div>
        <hr />
        <p>Don't Have An Account?</p>

        <Link className="link-styles" to="/SignUp">
          Sign Up
        </Link>
      </div>
    </>
  );
}

export default LogIn;
