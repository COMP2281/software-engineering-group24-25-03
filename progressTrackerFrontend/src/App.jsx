import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/authentication/Login'
import Home from './components/landing_page/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
