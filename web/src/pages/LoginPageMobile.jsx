import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPost } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import StatusBanner from '../components/StatusBanner.jsx';

export default function LoginPageMobile() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await apiPost('/auth/login', { username, password });
      signIn(result.token, result.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="m-shell">
      <div className="m-topbar">ShiftLog</div>

      <div className="m-card">
        <StatusBanner />

        <form onSubmit={handleSubmit}>
          <label className="m-label" htmlFor="m-user">Work email</label>
          <input
            id="m-user"
            type="text"
            className="m-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoCapitalize="words"
            autoCorrect="on"
            autoComplete="off"
          />

          <label className="m-label" htmlFor="m-pass">Password</label>
          <input
            id="m-pass"
            type="text"
            className="m-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />

          {error ? <p className="m-error">{error}</p> : null}

          <button type="submit" className="m-button" disabled={loading}>
            {loading ? '...' : 'Sign in'}
          </button>
        </form>

        <Link className="m-link" to="/reset-password">Forgot your password?</Link>
      </div>

      <div className="m-footer">ShiftLog internal tool</div>
    </div>
  );
}
