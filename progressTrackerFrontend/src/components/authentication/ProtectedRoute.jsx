import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authRefresh } from '../../redux/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken) || localStorage.getItem('refresh');
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    if (!accessToken && refreshToken) {
      dispatch(authRefresh({ refresh: refreshToken })).finally(() => {
        setIsRefreshing(false);
      });
    } else {
      setIsRefreshing(false);
    }
  }, [accessToken, refreshToken, dispatch]);

  if (!refreshToken) {
    return <Navigate to="/login" />;
  }

  if (isRefreshing || status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return children;
};

export default ProtectedRoute;
