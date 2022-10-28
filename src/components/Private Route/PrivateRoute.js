import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Sketch } from '../../game/app';

function PrivateRoute() {
  useEffect(() => {
    new Sketch();
  }, []);

  const { currentUser } = useAuth();
  return currentUser ? <></> : <Navigate to="/login" />;
}

export default PrivateRoute;
