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

function LogIn() {
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
      navigate('/landing');
    } catch (error) {
      setError('failed to log in');
    }
  };

  return (
    <>
      <div className="eightBitForm">
        <div>
          <h2>Login</h2>
          {/* {loginError && loginError} */}
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
              <Form onSubmit={handleSubmit} className="row g-3 ">
                {/* email */}
                <Form.Group controlId="formEmail" className="mb-0">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
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
                </Form.Group>
                {/* password */}
                <Form.Group controlId="formPassword" className="mb-0">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
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
                </Form.Group>
                {/* buttons */}
                <Form.Group controlId="submit" className="col-12">
                  <Button
                    type="submit"
                    variant="primary"
                    className="my-4 w-100"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
          <p>Don't Have An Account?</p>
          <p>
            <Link to="/">Sign Up</Link>
          </p>
          <Button
            type="button"
            variant="primary"
            className="my-4"
            onClick={guestLogin}
          >
            Guest Sign In
          </Button>
        </div>
      </div>
    </>
  );
}

export default LogIn;
