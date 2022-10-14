import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faUser,
  faGamepad,
  faTrophy,
  faCircleXmark,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function Sidebar() {
  const [error, setError] = useState('');

  //animation
  const [isBooped1, setBooped1] = useState(false);
  const [isBooped2, setBooped2] = useState(false);
  const [isBooped3, setBooped3] = useState(false);
  const [isBooped4, setBooped4] = useState(false);
  const [isBooped5, setBooped5] = useState(false);
  const [isBooped6, setBooped6] = useState(false);

  const [style1, api1] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    translateX: '0px',
    config: config.slow,
  }));
  const [style2, api2] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    translateX: '0px',
    config: config.slow,
  }));
  const [style3, api3] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    translateX: '0px',
    config: config.slow,
  }));
  const [style4, api4] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    translateX: '0px',
    config: config.slow,
  }));
  const [style5, api5] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    translateX: '0px',
    borderColor: 'red',
    config: config.slow,
  }));
  const [style6, api6] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));

  const onMouseEnter1 = useCallback(() => setBooped1(true), []);
  const onMouseLeave1 = useCallback(() => setBooped1(false), []);
  const onMouseEnter2 = useCallback(() => setBooped2(true), []);
  const onMouseLeave2 = useCallback(() => setBooped2(false), []);
  const onMouseEnter3 = useCallback(() => setBooped3(true), []);
  const onMouseLeave3 = useCallback(() => setBooped3(false), []);
  const onMouseEnter4 = useCallback(() => setBooped4(true), []);
  const onMouseLeave4 = useCallback(() => setBooped4(false), []);
  const onMouseEnter5 = useCallback(() => setBooped5(true), []);
  const onMouseLeave5 = useCallback(() => setBooped5(false), []);
  const onMouseEnter6 = useCallback(() => setBooped6(true), []);
  const onMouseLeave6 = useCallback(() => setBooped6(false), []);

  useEffect(() => {
    if (isBooped1) {
      api1.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
        // transform: 'rotateY(360deg)',
      });
    } else {
      api1.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
        // transform: 'rotateY(0deg)',
      });
    }
  }, [isBooped1, api1]);
  useEffect(() => {
    if (isBooped2) {
      api2.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
        // transform: 'rotateY(360deg)',
      });
    } else {
      api2.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
        // transform: 'rotateY(0deg)',
      });
    }
  }, [isBooped2, api2]);
  useEffect(() => {
    if (isBooped3) {
      api3.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
        // transform: 'rotateY(360deg)',
      });
    } else {
      api3.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
        // transform: 'rotateY(0deg)',
      });
    }
  }, [isBooped3, api3]);
  useEffect(() => {
    if (isBooped4) {
      api4.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
        // transform: 'rotateY(360deg)',
      });
    } else {
      api4.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
        // transform: 'rotateY(0deg)',
      });
    }
  }, [isBooped4, api4]);
  useEffect(() => {
    if (isBooped5) {
      api5.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
        // transform: 'rotateY(360deg)',
      });
    } else {
      api5.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
        // transform: 'rotateY(0deg)',
      });
    }
  }, [isBooped5, api5]);
  useEffect(() => {
    if (isBooped6) {
      api6.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
        // transform: 'rotateY(360deg)',
      });
    } else {
      api6.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
        // transform: 'rotateY(0deg)',
      });
    }
  }, [isBooped6, api6]);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('failed to log out');
    }
  };

  //tooltip renderer
  const renderTooltipSave = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Save Progress{' '}
    </Tooltip>
  );
  const renderTooltipProfile = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      User Profile{' '}
    </Tooltip>
  );
  const renderTooltipGame = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Play Game{' '}
    </Tooltip>
  );
  const renderTooltipLeaderboard = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Leaderboard{' '}
    </Tooltip>
  );
  const renderTooltipLogout = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Log Out{' '}
    </Tooltip>
  );
  const renderTooltipHome = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Home{' '}
    </Tooltip>
  );

  return (
    <div className="sidebar-container">
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipHome}
      >
        <animated.div
          style={style6}
          onMouseEnter={onMouseEnter6}
          onMouseLeave={onMouseLeave6}
        >
          <Link to="/landing">
            {' '}
            <FontAwesomeIcon
              icon={faHome}
              size="lg"
              fixedWidth
              className="sidebarIcon"
            />
          </Link>
        </animated.div>
      </OverlayTrigger>
      {currentUser?.isAnonymous ? (
        <OverlayTrigger
          placement="left"
          delay={{ show: 100, hide: 400 }}
          overlay={renderTooltipSave}
        >
          <animated.div
            style={style1}
            onMouseEnter={onMouseEnter1}
            onMouseLeave={onMouseLeave1}
          >
            <Link to="/registerGuest">
              <FontAwesomeIcon
                icon={faFloppyDisk}
                size="lg"
                fixedWidth
                className="sidebarIcon"
              // style={style}
              />
            </Link>
          </animated.div>
        </OverlayTrigger>
      ) : (
        <></>
      )}
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipProfile}
      >
        <animated.div
          style={style2}
          onMouseEnter={onMouseEnter2}
          onMouseLeave={onMouseLeave2}
        >
          <Link to="/profile">
            {' '}
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              fixedWidth
              className="sidebarIcon"
            />
          </Link>
        </animated.div>
      </OverlayTrigger>

      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipGame}
      >
        <animated.div
          style={style3}
          onMouseEnter={onMouseEnter3}
          onMouseLeave={onMouseLeave3}
        >
          <Link to="/game">
            {' '}
            <FontAwesomeIcon
              icon={faGamepad}
              size="lg"
              fixedWidth
              className="sidebarIcon"
            />
          </Link>
        </animated.div>
      </OverlayTrigger>

      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipLeaderboard}
      >
        <animated.div
          style={style4}
          onMouseEnter={onMouseEnter4}
          onMouseLeave={onMouseLeave4}
        >
          <Link to="/leaderboards">
            {' '}
            <FontAwesomeIcon
              icon={faTrophy}
              size="lg"
              fixedWidth
              className="sidebarIcon"
            />
          </Link>
        </animated.div>
      </OverlayTrigger>

      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipLogout}
      >
        <animated.div
          style={style5}
          onMouseEnter={onMouseEnter5}
          onMouseLeave={onMouseLeave5}
        >
          <span onClick={handleLogout}>
            {' '}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="logoutIcon"
              size="lg"
              fixedWidth
              inverse
            />
          </span>
        </animated.div>
      </OverlayTrigger>
    </div>
  );
}

export default Sidebar;
