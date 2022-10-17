import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

//howler sounds
import { Howl, Howler } from 'howler';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function SignInSplash() {
  const [signupError, setError] = useState('');

  //SFX
  const coinDrop = new Howl({
    src: ['/sounds/coin.mp3'],
    volume: 0.5,
  });

  const navigate = useNavigate();

  //func which allows user to login as guest
  const { loginAsGuest } = useAuth();

  //guest login handler
  const guestLogin = async (event) => {
    event.preventDefault();

    try {
      await loginAsGuest();
      //play the coin sound
      coinDrop.play();
      navigate('/landing');
    } catch (error) {
      setError('failed to log in');
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

  return (
    <>
      <div id="lowerDown" className="form-container">
        <h2>Welcome, Player</h2>
        <div className="splashButtonContainer">
          {/* {signupError && window.alert(signupError)} */}
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
        <p>Already Have An Account?</p>
        <Link className="link-styles" to="/login">
          Log In
        </Link>
        <hr />
        <p>Want to register?</p>
        <Link className="link-styles" to="/SignUp">
          Sign Up
        </Link>
      </div>
    </>
  );
}

export default SignInSplash;
