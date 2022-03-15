import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from "./firebase";

import LoginForm from './components/Login/LoginForm';
import Register from './components/Login/Register';
import App from "./components/Login/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);