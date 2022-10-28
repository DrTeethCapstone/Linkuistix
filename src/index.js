import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from '@react-three/drei';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Loader />
  </Suspense>
);
