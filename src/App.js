import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Landing from "./components/Landing/Landing";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import CanvasBg from "./components/THREE/Background/CanvasBg";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      <AuthProvider>
        <CanvasBg />
        <Routes>
          <Route exact index path='/' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

//things ive done
// npm i react router
// connect some routes
// login/signup components
// connect firebase auth