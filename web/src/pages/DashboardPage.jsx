import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';
import EntryList from '../components/EntryList.jsx';

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState('');
  const [site, setSite] = useState('main');
  const [minutes, setMinutes] = useState(0);
  const [error, setError] = useState('');

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    apiGet('/entries')
      .then((data) => setEntries(data.entries))
      .catch((err) => setError(err.message));
  });

  async function handleAdd(event) {
    event.preventDefault();
    setError('');

    try {
      await apiPost('/entries', { note, site, minutes: Number(minutes) });
      setNote('');
      const data = await apiGet('/entries');
      setEntries(data.entries);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Shift log</h1>
        <div className="header-right">
          <span>{user ? user.fullName : 'Signed in'}</span>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </header>

      <form className="entry-form" onSubmit={handleAdd}>
        <input
          placeholder="What happened on shift?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <select value={site} onChange={(e) => setSite(e.target.value)}>
          <option value="main">Main site</option>
          <option value="north">North site</option>
        </select>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button type="submit">Add entry</button>
      </form>

      {error ? <p className="error">{error}</p> : null}

      <EntryList entries={entries} />
    </div>
  );
}
