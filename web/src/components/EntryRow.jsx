import { useState } from 'react';

export default function EntryRow({ entry }) {
  const [minutes] = useState(entry.minutes);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="entry-row" onClick={() => setExpanded(!expanded)}>
      <div className="entry-main">
        <span className="entry-note">{entry.note}</span>
        <span className="entry-site">{entry.site}</span>
        <span className="entry-minutes">{minutes} min</span>
      </div>

      <div className="entry-meta">
        <span>{entry.author}</span>
        <span className="entry-time">{entry.displayTime}</span>
      </div>

      {expanded && (
        <div className="entry-detail">
          <div>Time: {entry.displayTime}</div>
          <div>Raw occurred_at: {String(entry.occurredAt)}</div>
          <div>Raw created_at: {String(entry.createdAt)}</div>
        </div>
      )}
    </div>
  );
}
