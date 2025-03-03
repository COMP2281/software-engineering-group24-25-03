import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";
import './authentication.css'
import { Card, Row, Col, Container } from "react-bootstrap";
import { Input } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
	// don't touch this stuff when doing front end styling
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const error_msg = useSelector((state) => state.auth.error);

    const onSubmit = async (e) => {
        e.preventDefault()  
        const result = await dispatch(login({ username, password }));
        if (login.fulfilled.match(result)) {
            // Redirect on successful login
            navigate('/'); 
        }
    }
	// everything below this can be changed other than input boxes
  return (
    <div className="auth-html">
        <div className="auth-body">
            <Container className="container-style">
            <Card className="card-style">
                <h1 className="center-text">Login</h1>
                <hr/>
                <small className="error-msg">{error_msg}</small>

                <form onSubmit={onSubmit}>
                    {/* use these input boxes when doing the front end styling becuase they are linked to the backend */}
                    <Col>
                        <Row>
                            <Input 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e)=>setUsername(e.target.value)}
                                fullWidth
                                sx={{ mt: 2, mb: 2 }}
                                type="filled"
                            />
                        </Row>
                        <br/>
                        <Row>
                            <Input 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)}
                                fullWidth
                                sx={{ mt: 2, mb: 2 }}
                                type="password"
                            />
                        </Row>
                        <br/>
                        <Row>
                            <button className="login-button" type="submit">Done</button>
                        </Row>
                        <hr/>
                        <Row>
                            <p>Don't Have An Account? <Link to="/register">Register</Link></p>
                        </Row>
                    </Col>
                </form>
            </Card>
            </Container>
        </div>
    </div>
  )
}