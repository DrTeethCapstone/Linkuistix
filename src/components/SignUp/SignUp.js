import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

//Toast
import { toast } from 'react-toastify';

//Form validation
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

//define the Yup validation schema for SIGNUP
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .matches(
      /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm,
      'Alphanumeric, dot, underscore, and dash only'
    )
    .required('Required'),

  email: Yup.string().trim().email('Invalid email').required('Required'),
  password: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  changepassword: Yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both passwords need to be the same'
    ),
  }),
});

function SignUp({ setShowSidebar, sketch }) {
  const navigate = useNavigate();

  const { signup, loginAsGuest, currentUser } = useAuth();

  //guest login handler
  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await loginAsGuest();
      setShowSidebar(true);
    } catch (error) {
      console.log('failed to log in: ', error);
    }
  };

  return (
    <>
      <div className="form-container">
        <h2>Sign Up</h2>
        <div>
          <Formik
            initialValues={{
              password: '',
              changepassword: '',
              username: '',
              email: '',
              fName: '',
              lName: '',
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
                //we try to authenticate the user
                // if the user exists, signupSuccess returns false
                const signupSuccess = await signup(
                  castValues.email,
                  castValues.password,
                  castValues.username
                );

                if (signupSuccess.status) {
                  setShowSidebar(true);
                  navigate('/game');
                } else {
                  toast.error(signupSuccess.reason);
                  throw new Error('user already exists');
                }
              } catch (error) {
                console.log(error);
                console.log('failed to create account: ', error);
              }
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
              <form onSubmit={handleSubmit} className="row g-3 w-100">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="me@web.com"
                  autoComplete="email"
                  autoCapitalize="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? 'error' : null}
                />
                {errors.email && touched.email ? (
                  <div className="error-message">{errors.email}</div>
                ) : null}
                <label>Username</label>

                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="username"
                  autoCapitalize="off"
                  className={
                    touched.username && errors.username ? 'error' : null
                  }
                />
                {errors.username && touched.username ? (
                  <div className="error-message">{errors.username}</div>
                ) : null}
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="new-password"
                  className={
                    touched.password && errors.password ? 'error' : null
                  }
                />
                {errors.password && touched.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}

                <label>Confirm Password</label>

                <input
                  type="password"
                  name="changepassword"
                  placeholder="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.changepassword}
                  autoComplete="off"
                  className={
                    touched.changepassword && errors.changepassword
                      ? 'error'
                      : null
                  }
                />
                {errors.changepassword && touched.changepassword ? (
                  <div className="error-message">{errors.changepassword}</div>
                ) : null}
                <button
                  type="submit"
                  variant="primary"
                  className="my-4 w-100"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </form>
            )}
          </Formik>
          <p>Or</p>
          <button type="button" className="form-button" onClick={guestLogin}>
            Play As guest
          </button>
        </div>
        <hr />
        <p>Already Have An Account?</p>
        <Link className="link-styles" to="/login">
          Log In
        </Link>
      </div>
    </>
  );
}

export default SignUp;