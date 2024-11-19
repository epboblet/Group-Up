import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Pages/Home';
import NoPage from './Pages/NoPage';
import Layout from './Pages/Layout';
import Login from './Pages/Login';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const loggedIn = localStorage.getItem("loggedIn") != null ? true : false;

const LoginUser = () => {
  localStorage.setItem("loggedIn", true);
}

root.render(
  <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/Group-Up' element={<Home />} />
            <Route path='/react' element={<App />} />
            <Route path='/profile' element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
