import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Input } from "@mui/material";
import { Link } from "react-router-dom";

export default function Register() {
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
    // Dispatch the register action (adjust as needed for your backend)
    const result = await dispatch(
      register({ first_name, last_name, email, username, password })
    );
    if (register.fulfilled.match(result)) {
        navigate("/login");
    }
  };

  return (
    <Container className="container-style">
      <Card className="card-style">
        <h1 className="center-text">Register</h1>
        <hr />
        <small className="error-msg">{error_msg}</small>
        <form onSubmit={onSubmit}>
          <Col>
            <Row>
              <Input
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              />
            </Row>
            <Row>
              <Input
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              />
            </Row>
            <Row>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              />
            </Row>
            <Row>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              />
            </Row>
            <Row>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              />
            </Row>
            <Row>
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                sx={{ mt: 2, mb: 2 }}
              />
            </Row>
            <Row>
              <button className="login-button" type="submit">
                Register
              </button>
            </Row>
            <hr />
            <Row>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Row>
          </Col>
        </form>
      </Card>
    </Container>
  );
}
