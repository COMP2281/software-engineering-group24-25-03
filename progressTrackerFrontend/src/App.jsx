import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/authentication/Login'
import Home from './components/landing_page/Home';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authRefresh } from './redux/slices/authSlice';

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
      </Routes>
    </Router>
  )
}

export default App
