import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './frontend/pages/Home';
import Signup from './frontend/pages/Signup';
import Login from './frontend/pages/Login';
import Portofolio from './frontend/pages/Portofolio';
import { UserProvider } from './frontend/components/UserProvider';
import { ImagesProvider } from './frontend/components/ImagesProvider';

function App() {
  return (
    <UserProvider>
      <ImagesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Portofolio" element={<Portofolio />} />
        </Routes>
      </ImagesProvider>
    </UserProvider>
  );
}

export default App;
