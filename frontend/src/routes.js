import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserDashboard from './pages/UserDashboard';

const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/user/dashboard" element={<UserDashboard />} />
  </Routes>
);

export default routes;
