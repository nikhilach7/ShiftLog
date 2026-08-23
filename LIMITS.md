# Limits

# Limitations

- Site records do not currently contain individual timezone information, so timestamps use the configured `SERVER_TZ`.
- Authentication tokens are stored in the server's in-memory session store, so restarting the API invalidates existing sessions.
- Mobile testing was performed using Chrome DevTools device emulation rather than a physical Android device.
- No production deployment or load testing was performed.