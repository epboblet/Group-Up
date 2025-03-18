import Home from './Pages/Home';
import NoPage from './Pages/NoPage';
import Layout from './Pages/Layout';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Messages from './Pages/Messages';
import Explore from './Pages/Explore';
import { ProtectedRoute } from './Components/ProtectedRoute';
import Project from './Pages/Project';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/project/:id' element={<Project />} />
            <Route path='/login' element={<Login />} />

            <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path='/profile/:id' element={<Profile />}/>

            <Route path='/messages' element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
  )
}

export default App;
