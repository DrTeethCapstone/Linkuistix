import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Modals
import RegisterGuestModal from './modals/RegisterGuestModal';
import LeaderboardModal from './modals/LeaderboardModal';
import ProfileModal from './modals/ProfileModal';
import AboutModal from './modals/AboutModal';

//Buttons
import AboutButton from './buttons/AboutButton';
import LeaderboardButton from './buttons/LeaderboardButton';
import LogoutButton from './buttons/LogoutButton';
import MusicButton from './buttons/MusicButton';
import RegisterGuestButton from './buttons/RegisterGuestButton';
import SoundButton from './buttons/SoundButton';
import UserProfileButton from './buttons/UserProfileButton';

//user auth
import { useAuth } from '../../contexts/AuthContext';

//sounds
import { Howler, Howl } from 'howler';

//------------------------------------------------------------------------------------------------------------------->
function Sidebar({ sketch, setShowSidebar, showSidebar }) {
  //our current user info and logout method
  const { currentUser, logout } = useAuth();

  //state
  const [soundOn, setSoundOn] = useState(true); //sound on or not
  const [musicOn, setMusicOn] = useState(false); //music playing or stopped
  const [showSound, setShowSound] = useState({}); //show the sound tooltip song and dance
  const [showMusic, setShowMusic] = useState({}); //show the music tooltip song and dance
  const [musicId, setMusicId] = useState(''); //store the music Howler ID because Howler

  //if isFirstLogin doesn't exist on window, you ain't been here before, so false
  const getFirstLogin = window.localStorage.getItem('isFirstLogin')
    ? false
    : true;
  //Then set it
  const [isFirstLogin, setIsFirstLogin] = useState(getFirstLogin); //your first login, innit, mate?

  //register guest modal
  const [showRegisterGuest, setShowRegisterGuest] = useState(false);
  const handleRegisterGuestClose = () => setShowRegisterGuest(false);
  const handleRegisterGuestShow = () => setShowRegisterGuest(true);

  //user profile modal
  const [showUser, setShowUser] = useState(false);
  const handleUserClose = () => setShowUser(false);
  const handleUserShow = () => setShowUser(true);

  //leaderboard modal
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const handleLeaderboardClose = () => setShowLeaderboard(false);
  const handleLeaderboardShow = () => setShowLeaderboard(true);

  //about modal
  const [showAbout, setShowAbout] = useState(false);
  const handleAboutClose = () => setShowAbout(false);
  const handleAboutShow = () => setShowAbout(true);

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
    volume: 0.15,
    loop: true,
  });

  //highlight the mute and music buttons on first login
  if (isFirstLogin && showSidebar) {
    const showOpeningTips = async () => {
      const delayTips = async () => {
        setTimeout(() => {
          setShowSound({ show: true });
        }, 6000);
        setTimeout(() => {
          setShowMusic({ show: true });
        }, 3000);

        setTimeout(() => {
          setShowSound(null);
        }, 9000);
        setTimeout(() => {
          setShowMusic(null);
        }, 5700);
      };
      await delayTips();

      //set first login to false
      //we store it in localStorage so we can hold onto the info on refresh
      setIsFirstLogin(false);
      window.localStorage.setItem('isFirstLogin', false);
    };
    showOpeningTips();
  }

  //declared for react-router-dom rerouting
  const navigate = useNavigate();

  //logs user out, removes sidebar, and navigates home
  const handleLogout = async () => {
    try {
      await logout();
      setShowSidebar(false);

      navigate('/');
    } catch (error) {
      console.log('failed to log out: ', error);
    }
  };

  return (
    <>
      <div className="sidebar-container">
        {/* BUTTONS */}
        <RegisterGuestButton
          currentUser={currentUser}
          handleRegisterGuestShow={handleRegisterGuestShow}
        />
        <UserProfileButton handleUserShow={handleUserShow} />
        <LeaderboardButton handleLeaderboardShow={handleLeaderboardShow} />
        <SoundButton
          showSound={showSound}
          handleSoundOnOff={handleSoundOnOff}
          soundOn={soundOn}
          showSidebar={showSidebar}
          isFirstLogin={isFirstLogin}
        />
        <MusicButton
          handleMusicOn={handleMusicOn}
          handleMusicOff={handleMusicOff}
          musicOn={musicOn}
          showMusic={showMusic}
          showSidebar={showSidebar}
          isFirstLogin={isFirstLogin}
        />
        <AboutButton handleAboutShow={handleAboutShow} />
        <LogoutButton handleLogout={handleLogout} />

        {/* MODALS */}
        <RegisterGuestModal
          showRegisterGuest={showRegisterGuest}
          handleRegisterGuestClose={handleRegisterGuestClose}
        />
        <LeaderboardModal
          showLeaderboard={showLeaderboard}
          handleLeaderboardClose={handleLeaderboardClose}
        />
        <AboutModal showAbout={showAbout} handleAboutClose={handleAboutClose} />
        {currentUser ? (
          <ProfileModal
            showUser={showUser}
            handleUserClose={handleUserClose}
            userId={currentUser.uid}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Sidebar;
