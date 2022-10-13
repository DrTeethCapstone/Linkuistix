import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Landing from './components/Landing/Landing';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import CanvasBg from './components/THREE/Background/CanvasBg';
import Profile from './components/Profile/Profile';
import RegisterGuest from './components/RegisterGuest/RegisterGuest';
import Test from './Test';
import TestGame from './components/TestGame/TestGame';
import Leaderboards from './components/Leaderboards/Leaderboards';

//Toast popups
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
        {/* <CanvasBg /> */}
        <Test />
        <Routes>
          <Route exact index path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registerGuest" element={<RegisterGuest />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<TestGame />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
        </Routes>
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
