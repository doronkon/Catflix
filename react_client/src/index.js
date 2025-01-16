import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import MovieDetail from './pages/MovieDetail/MovieDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <React.StrictMode>
  <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path='/signup' element ={<SignUp/>}/>
        <Route path='/login' element ={<Login/>}/>
      </Routes>
  </React.StrictMode>
  </Router>
);
