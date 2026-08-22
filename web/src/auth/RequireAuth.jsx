import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const stored = localStorage.getItem('shiftlog.token');

  if (!stored) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
