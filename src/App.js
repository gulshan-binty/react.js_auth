import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, useNavigate } from 'react-router';
import Registration from './pages/registration';
import Layout from './components/layout'
import Login from './pages/login';
import Dashboard from './pages/logged-in-pages/dashboard';
import Redirect from './pages/redirect';
function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="registration"
          element={<Registration />}
        />
         <Route
          path="login"
          element={<Login />}
        />
        <Route path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Redirect/>}/>
          
      </Route>
    </Routes>
  );
}

export default App;
