import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//user auth
import { getAuth } from 'firebase/auth';
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
  faVolumeHigh,
  faVolumeXmark,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

//sounds
import { Howler, Howl } from 'howler';

function Sidebar() {
  const [error, setError] = useState('');
  const auth = getAuth();

  const { currentUser, logout, loginAsGuest } = useAuth();

  //if the user isn't logged in, log them in as guest
  useEffect(() => {
    //init user
    async function loginUser() {
      //check if user is logged in
      const user = auth.currentUser;
      if (user) {
        // user is signed in
      } else {
        // User is signed out
        console.log('logging in as guest');
        await loginAsGuest();
      }
    }
    loginUser();
  }, [loginAsGuest, auth.currentUser]);

  //state
  const [soundOn, setSoundOn] = useState(true); //sound on or not
  const [musicOn, setMusicOn] = useState(false); //music playing or stopped
  const getFirstLogin = window.localStorage.getItem('isFirstLogin')
    ? false
    : true;
  const [isFirstLogin, setIsFirstLogin] = useState(getFirstLogin); //your first login, innit, mate?
  const [showSound, setShowSound] = useState({}); //show the sound tooltip song and dance
  const [showMusic, setShowMusic] = useState({}); //show the music tooltip song and dance
  const [musicId, setMusicId] = useState(''); //store the music Howler ID because Howler

  //toggles global app sound on/off
  const handleSoundOnOff = () => {
    setSoundOn(!soundOn);
  };

  //handles music on. Note that we set the Id of the music to turn it off later
  const handleMusicOn = () => {
    setMusicOn(!musicOn);
    music.play();
    setMusicId(music._sounds[0]._id); //that's where Howler puts the audio instance ID...
  };

  //handles music off. Note that we need to grab the Id of the sound
  const handleMusicOff = () => {
    setMusicOn(!musicOn);
    Howler.stop(musicId);
  };

  //sets Howler sound state based on state variable
  useEffect(() => {
    if (soundOn) {
      Howler.mute(false);
    } else {
      Howler.mute(true);
    }
  }, [soundOn]);

  //our little music piece
  const music = new Howl({
    src: ['/sounds/fantasy.mp3'],
    volume: 0.5,
    loop: true,
  });

  //animation for buttons
  const [isBoopedSave, setBoopedSave] = useState(false);
  const [isBoopedUser, setBoopedUser] = useState(false);
  const [isBoopedGame, setBoopedGame] = useState(false);
  const [isBoopedRank, setBoopedRank] = useState(false);
  const [isBoopedLogout, setBoopedLogout] = useState(false);
  const [isBoopedHome, setBoopedHome] = useState(false);
  const [isBoopedSound, setBoopedSound] = useState(false);
  const [isBoopedMusic, setBoopedMusic] = useState(false);

  //highlight the mute and music buttons on first login
  if (isFirstLogin) {
    setTimeout(() => {
      setBoopedSound(true);
      setShowSound({ show: true });
    }, 6000);
    setTimeout(() => {
      setBoopedMusic(true);
      setShowMusic({ show: true });
    }, 3000);

    setTimeout(() => {
      setBoopedSound(false);
      setShowSound(null);
    }, 9000);
    setTimeout(() => {
      setBoopedMusic(false);
      setShowMusic(null);
    }, 5700);

    //set first login to false
    //we store it in locatStorage so we can hold onto the info on refresh
    setIsFirstLogin(false);
    window.localStorage.setItem('isFirstLogin', false);
  }

  const [styleSave, apiSave] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));
  const [styleUser, apiUser] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));
  const [styleGame, apiGame] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));
  const [styleLeaderboard, apiLeaderboard] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));
  const [styleLogout, apiLogout] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'red',
    config: config.slow,
  }));
  const [styleHome, apiHome] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));
  const [styleSound, apiSound] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'cornflowerblue',
    config: config.slow,
  }));
  const [styleMusic, apiMusic] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'lightgreen',
    config: config.slow,
  }));

  //handles all the mouseovers
  const onMouseEnter1 = useCallback(() => setBoopedSave(true), []);
  const onMouseLeave1 = useCallback(() => setBoopedSave(false), []);
  const onMouseEnter2 = useCallback(() => setBoopedUser(true), []);
  const onMouseLeave2 = useCallback(() => setBoopedUser(false), []);
  const onMouseEnter3 = useCallback(() => setBoopedGame(true), []);
  const onMouseLeave3 = useCallback(() => setBoopedGame(false), []);
  const onMouseEnter4 = useCallback(() => setBoopedRank(true), []);
  const onMouseLeave4 = useCallback(() => setBoopedRank(false), []);
  const onMouseEnter5 = useCallback(() => setBoopedLogout(true), []);
  const onMouseLeave5 = useCallback(() => setBoopedLogout(false), []);
  const onMouseEnter6 = useCallback(() => setBoopedHome(true), []);
  const onMouseLeave6 = useCallback(() => setBoopedHome(false), []);
  const onMouseEnter7 = useCallback(() => setBoopedSound(true), []);
  const onMouseLeave7 = useCallback(() => setBoopedSound(false), []);
  const onMouseEnter8 = useCallback(() => setBoopedMusic(true), []);
  const onMouseLeave8 = useCallback(() => setBoopedMusic(false), []);

  useEffect(() => {
    if (isBoopedSave) {
      apiSave.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiSave.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedSave, apiSave]);
  useEffect(() => {
    if (isBoopedUser) {
      apiUser.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiUser.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedUser, apiUser]);
  useEffect(() => {
    if (isBoopedGame) {
      apiGame.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiGame.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedGame, apiGame]);
  useEffect(() => {
    if (isBoopedRank) {
      apiLeaderboard.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiLeaderboard.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedRank, apiLeaderboard]);
  useEffect(() => {
    if (isBoopedLogout) {
      apiLogout.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiLogout.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedLogout, apiLogout]);
  useEffect(() => {
    if (isBoopedHome) {
      apiHome.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiHome.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedHome, apiHome]);
  useEffect(() => {
    if (isBoopedSound) {
      apiSound.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiSound.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedSound, apiSound]);
  useEffect(() => {
    if (isBoopedMusic) {
      apiMusic.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiMusic.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedMusic, apiMusic]);

  const navigate = useNavigate();

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
  const renderTooltipSound = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Sound On/Off{' '}
    </Tooltip>
  );
  const renderTooltipMusic = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Music On/Off{' '}
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
          style={styleHome}
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
            style={styleSave}
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
          style={styleUser}
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
          style={styleGame}
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
          style={styleLeaderboard}
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
        {...showSound}
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipSound}
      >
        <animated.div
          style={styleSound}
          onMouseEnter={onMouseEnter7}
          onMouseLeave={onMouseLeave7}
        >
          <span onClick={handleSoundOnOff}>
            {' '}
            <FontAwesomeIcon
              icon={soundOn ? faVolumeHigh : faVolumeXmark}
              className="soundIcon"
              size="lg"
              fixedWidth
              inverse
            />
          </span>
        </animated.div>
      </OverlayTrigger>

      <OverlayTrigger
        placement="left"
        {...showMusic}
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipMusic}
      >
        <animated.div
          style={styleMusic}
          onMouseEnter={onMouseEnter8}
          onMouseLeave={onMouseLeave8}
        >
          <span onClick={musicOn ? handleMusicOff : handleMusicOn}>
            {' '}
            <FontAwesomeIcon
              icon={musicOn ? faStop : faPlay}
              className="soundIcon"
              size="lg"
              fixedWidth
              inverse
            />
          </span>
        </animated.div>
      </OverlayTrigger>
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipLogout}
      >
        <animated.div
          style={styleLogout}
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
