import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authFeatures/authSlice';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Hata loglaması yapabilirsiniz
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

function ErrorFallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="error-fallback">
      <h2>Bir hata oluştu!</h2>
      <p>Üzgünüz, beklenmedik bir sorun meydana geldi.</p>
      <button onClick={handleLogout}>Tekrar Giriş Yap</button>
    </div>
  );
}

export default ErrorBoundary;