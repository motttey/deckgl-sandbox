import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Overlay from './Overlay.jsx';
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Overlay />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();
