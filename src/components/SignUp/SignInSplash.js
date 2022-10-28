import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import ThreeApp from './ThreeAnimation/ThreeApp';

//animation
import { useSpring, animated, config } from '@react-spring/web';

//don't show sidebar until logged in
window.localStorage.setItem('displaySidebar', false);

function SignInSplash({ setShowSidebar }) {
  const navigate = useNavigate();
  const auth = getAuth();

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

  //func which allows user to login as guest
  const { loginAsGuest } = useAuth();

  //guest login handler
  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await loginAsGuest();
      setShowSidebar(true);
      //play the coin sound
      navigate('/game');
    } catch (error) {
      console.log('failed to log in: ', error);
    }
  };

  //animation
  const [isBooped1, setBooped1] = useState(false);

  const [style1, api1] = useSpring(() => ({
    borderWidth: '2px',
    config: config.gentle,
  }));

  const onMouseEnter1 = useCallback(() => {
    setBooped1(true);
  }, []);
  const onMouseLeave1 = useCallback(() => {
    setBooped1(false);
  }, []);

  useEffect(() => {
    if (isBooped1) {
      api1.start({
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      api1.start({
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBooped1, api1]);

  if (isNewUser) {
    return (
      <>
        <div className="opacity">
          <div className="header-container d-flex flex-column w-100 align-items-center">
            <h1>Linkuistix</h1>
            <h6>Word association game powered by machine learning</h6>
          </div>
          <div className="form-container" id="form-container">
            <h2>Welcome, Player</h2>
            <div className="splashButtonContainer">
              <animated.button
                type="button"
                className="form-button"
                style={style1}
                onMouseEnter={onMouseEnter1}
                onMouseLeave={onMouseLeave1}
                onClick={guestLogin}
              >
                Play As Guest
              </animated.button>
            </div>
            <hr />
            <p id="loadFont">Already Have An Account?</p>
            <Link className="link-styles" to="/login">
              Log In
            </Link>
            <hr />
            <p id="loadFont">Want to register?</p>
            <Link className="link-styles" to="/SignUp">
              Sign Up
            </Link>
          </div>
          {/* <ThreeApp /> */}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default SignInSplash;
