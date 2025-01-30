import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout } from '../features/authFeatures/authSlice';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = localStorage.getItem('authToken');
  const userRole = parseInt(localStorage.getItem("role"), 10);

  useEffect(() => {
    // Token kontrolü
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Token süresi dolmuş veya geçersiz ise
        if (decodedToken.exp < currentTime) {
          dispatch(logout());
          return;
        }
      } catch (error) {
        // Token decode edilemiyorsa (bozuk token)
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  if (!isAuthenticated) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Kullanıcı giriş yapmışsa içeriği göster
  return children;
};

export default ProtectedRoute;
