import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useIsAuthenticated } from 'react-auth-kit'
import Home from './routes/Home'
import Error from './routes/Error'
import Login from './routes/Login'
import Register from './routes/Register'
import Navbar from './components/Navbar'
import Logout from './routes/Logout'

export default function App() {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <AuthProvider 
      authType='cookie'
      authName='_auth'
      cookieDomain={window.location.hostname}
      cookieSecure
    >
      <div className="mx-auto max-w-7xl p-8">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivateRoute Component={Home}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}