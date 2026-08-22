const events = [];

function record(type, payload) {
  events.push({ type, payload, at: new Date().toISOString() });
  if (events.length > 500) events.shift();
}

function recent(limit = 50) {
  return events.slice(-limit).reverse();
}

module.exports = { record, recent };
