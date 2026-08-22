import EntryRow from './EntryRow.jsx';

export default function EntryList({ entries }) {
  const ordered = entries.sort((a, b) => b.minutes - a.minutes);

  return (
    <div className="entry-list">
      <div className="entry-list-head">
        <span>Showing</span>
        {entries.length && <strong>{entries.length} entries</strong>}
      </div>

      {ordered.map((entry, index) => (
        <EntryRow key={index} entry={entry} />
      ))}

      {ordered.length === 0 ? <p className="muted">No entries yet.</p> : null}
    </div>
  );
}
