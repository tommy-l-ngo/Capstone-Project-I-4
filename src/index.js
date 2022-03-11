import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from "./firebase";
import Login from './components/Login';
import LoginForm from './LoginForm';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);