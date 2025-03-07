import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './authentications.css'; // Reusing the same CSS file for consistency

const Register = () => {
  // Component state for the input fields
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error_msg = useSelector((state) => state.auth.error);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }
    // Dispatch the register action
    const result = await dispatch(
      register({ first_name, last_name, email, username, password })
    );
    if (register.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>
        
        <form onSubmit={onSubmit}>
          {error_msg && <div className="error-message">{error_msg}</div>}
          
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your first name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Choose a username"
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
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Register
            </button>
          </div>
          
          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
