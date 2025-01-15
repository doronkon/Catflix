import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import Movies from './pages/HomeScreen/App';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import SaveImageLocally from './pages/components/SaveImage'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignUp />
  </React.StrictMode>
);
