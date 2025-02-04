import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authRefresh } from '../../redux/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  var refreshToken = useSelector((state) => state.auth.refreshToken);
  const status = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  if(!refreshToken){
    refreshToken = localStorage.getItem('refresh')
    if(!refreshToken){
        return <Navigate to="/login" />
    }
  }
  console.log(refreshToken)
  if(status == 'idle'){
    dispatch(authRefresh({ refresh: refreshToken }));
  }

    if(accessToken == null && status == 'idle'){
        return <Navigate to="/login" />

    }else if (status == 'loading'){
        return <h1>Loading</h1>
    }else{
        return children
    }
};

export default ProtectedRoute;
