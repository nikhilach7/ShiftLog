import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiPost } from '../api/client.js';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const result = await apiPost('/auth/password-reset', { email, newPassword });
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Reset password</h1>
        <p className="subtitle">Set a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="reset-email">Work email</label>
          <input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="reset-password">New password</label>
          <input
            id="reset-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {message ? <p className="success">{message}</p> : null}
          {error ? <p className="error">{error}</p> : null}

          <button type="submit">Update password</button>
        </form>

        <Link className="muted-link" to="/login">Back to sign in</Link>
      </div>
    </div>
  );
}
