import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudyRoom from './pages/StudyRoom';
import Dashboard from './pages/Dashboard';
import GameRoom from './pages/GameRoom';
// import Signup from './Auth/Signup';
// import Login from './Auth/Login';
import Signout from './Auth/Signout';
import SignUp from './Auth/Authenticate.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="authenticate" element={<SignUp />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signout" element={<Signout />} />
          <Route index element={<StudyRoom />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="games" element={<GameRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;