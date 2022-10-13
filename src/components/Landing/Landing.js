import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

function Landing() {
  const [chatState, setChatState] = useState(false);
  // console.log(chatState)
  const { currentUser } = useAuth();
  //   console.log(currentUser);

  return (
    <>
      <Sidebar />
      <div className="splash-container">
        <div className="header-container">
          <h1>NOT SEMANTRIS</h1>
          <h6>Word association games powered by machine learning and teeth</h6>
        </div>
        <div className="play-container">
          <div>
            <h3>ARCADE</h3>
            <hr></hr>
            <div>
              <p>Think fast.</p>
              <p>type fast!</p>
            </div>
            <div className="button-container">
              <button>PLAY ARCADE</button>
              <button>SKIP TUTORIAL</button>
            </div>
          </div>
          <div>
            <h3>ARCADE</h3>
            <hr></hr>
            <div>
              <p>Think fast.</p>
              <p>type fast!</p>
            </div>
            <div className="button-container">
              <button>PLAY ARCADE</button>
              <button>SKIP TUTORIAL</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
