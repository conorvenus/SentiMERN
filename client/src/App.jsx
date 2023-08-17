import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from 'react-auth-kit'
import Home from './routes/Home'
import Error from './routes/Error'
import Login from './routes/Login'
import Register from './routes/Register'
import Navbar from './components/Navbar'
import Logout from './routes/Logout'

export default function App() {
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
            <Route path="/" element={<Home />} />
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