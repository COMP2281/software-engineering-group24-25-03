import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";

export default function Login() {
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
  return (
    <div>
        <h5>{error_msg}</h5>
        <form onSubmit={onSubmit}>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username'/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
            <button type="submit">Doner</button>
        </form>
    </div>
  )
}
