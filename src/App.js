import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Sketch } from "./game/app";
import Landing from "./components/Landing/Landing";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import SignInSplash from "./components/SignUp/SignInSplash";
import Sidebar from "./components/Sidebar/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/Private Route/PrivateRoute";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const sketch = new Sketch();
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            exact
            index
            path="/"
            element={<SignInSplash setShowSidebar={setShowSidebar} />}
          />
          <Route
            exact
            index
            path="/signup"
            element={<SignUp setShowSidebar={setShowSidebar} />}
          />
          <Route
            path="/login"
            element={<LogIn setShowSidebar={setShowSidebar} />}
          />
          <Route path="/landing" element={<PrivateRoute />}>
            <Route
              path="/landing"
              element={
                <Landing
                  sketch={sketch}
                  setShowSidebar={setShowSidebar}
                  showSidebar={showSidebar}
                />
              }
            />
          </Route>
          <Route path="/game" element={<PrivateRoute />}></Route>
        </Routes>
        {showSidebar && (
          <Sidebar
            sketch={sketch}
            setShowSidebar={setShowSidebar}
            showSidebar={showSidebar}
          />
        )}
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
