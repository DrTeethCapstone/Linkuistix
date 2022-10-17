import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

//sounds
import { Howl, Howler } from 'howler';

function Landing({ sketch }) {
  const [chatState, setChatState] = useState(false);
  // const { currentUser } = useAuth();
  const [zoomState, setZoomState] = useState('splash-container');
  const navigate = useNavigate();

  //SFX
  const coinDrop = new Howl({
    src: ['/sounds/coin.mp3'],
    volume: 0.5,
  });

  const handleAnimation = () => {
    coinDrop.play();
    setZoomState('splash-container zoomout-splash');
    setTimeout(() => {
      navigate('/game');
      sketch.setPlaying(true);
      sketch.checkPlaying();
    }, 1900);
  };

  return (
    <>
      {/* <Sidebar /> */}
      <div className={zoomState}>
        <div className="header-container">
          <h1>NOT SEMANTRIS</h1>
          <h6>Word association games powered by machine learning and teeth</h6>
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
