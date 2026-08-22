import { useEffect, useState } from 'react';
import { apiGet } from '../api/client.js';

export default function StatusBanner() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiGet('/health')
      .then(setStatus)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="banner banner-error">Could not reach the API: {error}</div>;
  }

  if (!status) {
    return <div className="banner">Checking backend...</div>;
  }

  return <div className="banner banner-ok">{status.message}</div>;
}
