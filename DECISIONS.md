# Engineering Decisions

## Timestamp Handling
- Store `occurred_at` and `created_at` as PostgreSQL `TIMESTAMPTZ`.
- Interpret legacy seed timestamps in the configured application timezone.
- Use `SERVER_TZ` for user-facing timestamp formatting.
- The frontend displays the backend-formatted `displayTime` instead of applying browser-local conversion.
- Site-specific timezone mapping was not added because the current data does not define a timezone for each site.

## Authentication
Keep the existing token-based authentication architecture and persist the client session so a valid login survives page refresh.

## Mobile
Keep the existing web application and make it responsive rather than introducing a separate mobile implementation.