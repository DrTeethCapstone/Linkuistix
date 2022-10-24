import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

import { Formik } from 'formik';
import * as Yup from 'yup';

//define the Yup validation schema for LOGIN
const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email').required('Required'),
  password: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

function LogIn({ setShowSidebar, sketch }) {
  const [loginError, setError] = useState('');
  const navigate = useNavigate();

  const auth = getAuth();

  //if already logged in, redirect to game
  const [isNewUser, setIsNewUser] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setShowSidebar(true);
      navigate('/game');
      // ...
    } else {
      // User is signed out
      setIsNewUser(true);
      // ...
    }
  });

  if (loginError !== '') toast.error(loginError);

  const { login, loginAsGuest, currentUser } = useAuth();

  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await loginAsGuest();
      setShowSidebar(true);
      navigate('/game');
<<<<<<< HEAD
=======
      sketch.gameMenu.setUser({
        email: currentUser.email,
        id: currentUser.uid,
        username: currentUser.displayName
      })
>>>>>>> main
    } catch (error) {
      setError('failed to log in');
    }

  };

  if (isNewUser) {
    return (
      <>
        <div className='opacity'>
          <div className="form-container">
            <h2>Login</h2>
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
                  const castValues = LoginSchema.cast(values);

                  resetForm();
                  setSubmitting(false);

                  try {
                    setError('');
                    await login(castValues.email, castValues.password);
                    setShowSidebar(true);
                    navigate('/game');
                  } catch (error) {
                    console.log('failed to log in: ', error);
                  }
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
                      className={touched.email && errors.email ? 'error' : null}
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
                        touched.password && errors.password ? 'error' : null
                      }
                    />
                    {errors.password && touched.password ? (
                      <div className="error-message">{errors.password}</div>
                    ) : null}
                    <button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
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
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default LogIn;
