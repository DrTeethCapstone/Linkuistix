import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Sketch } from './game/app';
import Landing from './components/Landing/Landing';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import SignInSplash from './components/SignUp/SignInSplash';
import Profile from './components/Profile/Profile';
import RegisterGuest from './components/RegisterGuest/RegisterGuest';
import LoopBg from './LoopBg';
import TestGame from './components/TestGame/TestGame';
import Leaderboards from './components/Leaderboards/Leaderboards';
import WordGame from './components/WordGame/WordGame';
import Sidebar from './components/Sidebar/Sidebar';

//Toast popups
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameRoute from './components/Test';

function App() {
  const sketch = new Sketch();

  return (
    <>
      <AuthProvider>
        {/* <LoopBg /> */}
        <Routes>
          <Route exact index path="/" element={<SignInSplash />} />
          <Route exact index path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registerGuest" element={<RegisterGuest />} />
          <Route path="/landing" element={<Landing sketch={sketch} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/game" element={<GameRoute />} />
        </Routes>
        <Sidebar sketch={sketch} />
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

//things ive done
// npm i react router
// connect some routes
// login/signup components
// connect firebase auth
