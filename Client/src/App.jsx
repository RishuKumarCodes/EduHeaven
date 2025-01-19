import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudyRoom from './pages/StudyRoom';
import Dashboard from './pages/Dashboard';
import GameRoom from './pages/GameRoom';
// import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<StudyRoom />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="games" element={<GameRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;