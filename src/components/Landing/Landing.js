import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

//sounds
import { Howl, Howler } from 'howler';

function Landing({ sketch, setShowSidebar }) {
  const [chatState, setChatState] = useState(false);
  // const { currentUser } = useAuth();
  const [zoomState, setZoomState] = useState('splash-container');
  const currentUser = useAuth().currentUser
  const navigate = useNavigate();

  //SFX
  const coinDrop = new Howl({
    src: ['/sounds/coin.mp3'],
    volume: 0.5,
  });

  const handleAnimation = () => {
    coinDrop.play();
    setShowSidebar(true);
    setZoomState('splash-container zoomout-splash');
    setTimeout(() => {
      navigate('/game');
      sketch.setPlaying(true);
      sketch.checkPlaying();
      sketch.setUser({
        email: currentUser.email,
        id: currentUser.uid,
        username: currentUser.displayName
      })
    }, 1900);
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className={zoomState}>
        <div className="header-container">
          <h1>Linkuistix</h1>
<<<<<<< HEAD
          <h6>Word association games powered by machine learning and teeth</h6>
=======
          <h6>Word association game powered by machine learning</h6>
>>>>>>> main
        </div>
        <div className="play-container">
          <div>
            <h3>TIME ATTACK</h3>
            <hr></hr>
            <div>
              <p>Think fast.</p>
              <p>type fast!</p>
            </div>
            <div className="button-container">
              <button onClick={handleAnimation}>PLAY</button>
              {/* <button>SKIP TUTORIAL</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
