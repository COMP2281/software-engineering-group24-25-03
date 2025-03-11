import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './authentication.css';

const Login = () => {
  // Redux functionality
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error_msg = useSelector((state) => state.auth.error);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      // Redirect on successful login
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Log In</h1>
        
        <form onSubmit={onSubmit}>
          {error_msg && <div className="error-message">{error_msg}</div>}
          
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="email@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Enter
            </button>
          </div>
          
          <div className="form-footer">
            <p>
              Don't have an account? <Link to="/register" className="auth-link">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
