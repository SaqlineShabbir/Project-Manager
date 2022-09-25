import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import useAuthCheck from './hooks/useAuthCheck';
import useTeamCheck from './hooks/useTeam';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

function App() {
  const authChecked = useAuthCheck();
  const teamsCheked = useTeamCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={<PrivateRoute>{teamsCheked && <Projects />}</PrivateRoute>}
        />
        {/* <Route path="/inbox" element={<Conversation />} />
        <Route
          path="/inbox/:id"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
