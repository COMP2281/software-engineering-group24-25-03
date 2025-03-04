import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/authentication/Login'
import Home from './components/landing_page/Home';
import Report from './components/landing_page/Report';
import Test from './components/landing_page/Test';
import Register from './components/authentication/Register';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authRefresh } from './redux/slices/authSlice';
import HelpPage from './components/landing_page/Help';
import Settings from "./components/landing_page/Settings.jsx";

function App() {
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.auth.authenticated)
  useEffect(() => {
    if(authenticated){
      const refreshToken = localStorage.getItem('refresh')
      const intervalId = setInterval(dispatch(authRefresh({ refresh: refreshToken })), 1*60*1000)
      dispatch(authRefresh({ refresh: refreshToken }))
      return () => clearInterval(intervalId); 
    }
  },[])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/help" element={<ProtectedRoute><HelpPage/></ProtectedRoute>}/>
        <Route path="/reports" element={<ProtectedRoute><Report/></ProtectedRoute>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </Router>
  )
}

export default App
