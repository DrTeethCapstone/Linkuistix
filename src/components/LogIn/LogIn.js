import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

//Toast
import { toast } from 'react-toastify';

//form validation
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//define the Yup validation schema for LOGIN
const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required('Required'),
  password: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

function LogIn({ setShowSidebar }) {
  const [loginError, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (loginError !== '') toast.error(loginError);

  const { login, currentUser, loginAsGuest } = useAuth();

  // console.log(currentUser);

  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await loginAsGuest();
      setShowSidebar(true);
      navigate('/landing');
    } catch (error) {
      setError('failed to log in');
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Login</h2>
        {/* {loginError && loginError} */}
        <div>
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validationSchema={LoginSchema}
            validateOnChange={false}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              //using Yup to cast the validated inputs so we can send that to the db
              const castValues = LoginSchema.cast(values);
              //dispatch our authentication thunk

              resetForm();
              setSubmitting(false);

              try {
                setError('');
                setLoading(true);
                await login(castValues.email, castValues.password);
                setShowSidebar(true);
                navigate('/landing');
              } catch (error) {
                setError('failed to log in');
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
              <form onSubmit={handleSubmit}>
                {/* email */}
                {/* <Form.Group controlId="formEmail" className="mb-0"> */}
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="me@web.com"
                  autoFocus
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                  autoCapitalize="off"
                  className={touched.email && errors.email ? 'error' : null}
                />
                {errors.email && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
                {/* </Form.Group> */}
                {/* password */}
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                  autoCapitalize="off"
                  className={
                    touched.password && errors.password ? 'error' : null
                  }
                />
                {errors.password && touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
                {/* buttons */}
                <button type="submit" variant="primary" disabled={isSubmitting}>
                  Sign In
                </button>
              </form>
            )}
          </Formik>
          <hr />
          <button
            className="form-button"
            type="button"
            // variant="primary"
            // className="my-4"
            onClick={guestLogin}
          >
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
