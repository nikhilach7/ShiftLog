import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPost } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import StatusBanner from '../components/StatusBanner.jsx';
import LoginPageMobile from './LoginPageMobile.jsx';

function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { token, signIn } = useAuth();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  if (isAndroid()) {
    return <LoginPageMobile />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const result = await apiPost('/auth/login', { email, password });

    signIn(result.token, result.user);
    setLoading(false);
    navigate('/dashboard');
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>ShiftLog</h1>
        <p className="subtitle">Sign in to record and review shift activity.</p>

        <StatusBanner />

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Work email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {error ? <p className="error">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <Link className="muted-link" to="/reset-password">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
