import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudyRoom from './pages//studyRoom/StudyRoom.jsx';
import Dashboard from './pages/Dashboard';
import GameRoom from './pages/gameRoom/GameRoutes.jsx';
import MusicRoom from './pages/MusicRoom'
import Signout from './Auth/Signout';
import SignUp from './Auth/Authenticate.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PageNotFound from '../src/pages/PageNotFound'
import ProjectInfo from "../src/pages/ProjectInfo"

function App() {
  const token = localStorage.getItem("token"); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<StudyRoom />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="games/*" element={<GameRoom />} />
          <Route path="music" element={<MusicRoom />} />
          <Route path="authenticate" element={<SignUp />} />
          <Route path="signout" element={<Signout />} /> 
          <Route path="project-details" element={<ProjectInfo />} /> 
        {token && (
          <Route path="profile" element={<ProfilePage />} />
        )}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;