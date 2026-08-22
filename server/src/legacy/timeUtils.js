/**
 * Timestamp helpers.
 *
 * ShiftLog started as an internal tool for a single site, then we added a
 * second site in another region. Some of this file predates that change.
 */

const DISPLAY_TIMEZONE = 'Asia/Kabul';

function nowIso() {
  return new Date().toISOString();
}

function toDatabaseValue(input) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function formatForDisplay(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('en-GB', {
    timeZone: DISPLAY_TIMEZONE,
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function startOfDay(value) {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
}

module.exports = { nowIso, toDatabaseValue, formatForDisplay, startOfDay, DISPLAY_TIMEZONE };
