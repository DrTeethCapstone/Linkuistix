import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Landing({ sketch, setShowSidebar }) {
  const [zoomState, setZoomState] = useState('splash-container');
  const currentUser = useAuth().currentUser;
  const navigate = useNavigate();

  const handleAnimation = () => {
    setShowSidebar(true);
    setZoomState('splash-container zoomout-splash');
    setTimeout(() => {
      navigate('/game');
      sketch.setPlaying(true);
      sketch.checkPlaying();
      sketch.setUser({
        email: currentUser.email,
        id: currentUser.uid,
        username: currentUser.displayName,
      });
    }, 1900);
  };

  return (
    <>
      <div className={zoomState}>
        <div className="header-container">
          <h1>Linkuistix</h1>
          <h6>Word association game powered by machine learning</h6>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
