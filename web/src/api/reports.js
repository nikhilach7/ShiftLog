const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function fetchWeeklySummary() {
  const res = await fetch(`${BASE_URL}/api/reports/summary`, {
    headers: { Authorization: `Bearer ${window.__shiftlogToken}` },
  });
  return res.json();
}

export function weeklyCsvUrl() {
  return `${BASE_URL}/api/reports/weekly.csv`;
}
