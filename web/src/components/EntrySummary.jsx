export default function EntrySummary({ summary }) {
  const sites = Object.keys(summary || {});

  return (
    <div className="entry-summary">
      {sites.map((site) => (
        <div key={site} className="entry-summary-item">
          <strong>{site}</strong>
          <span>{summary[site].count} entries</span>
          <span>{summary[site].minutes} min</span>
        </div>
      ))}
    </div>
  );
}
