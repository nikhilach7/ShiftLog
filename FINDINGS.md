# Findings

## 1. CORS
The frontend origin was not fully allowed by the API, causing browser requests to fail. The CORS configuration was corrected to allow the frontend origin and required headers such as `Authorization`.

## 2. Dashboard
The dashboard had a render/request loop that prevented entries from displaying correctly. The affected React logic was corrected.

## 3. Authentication
The mobile login request sent `username`, while the API expected `email`. The mobile payload was corrected.

Session state is persisted across browser refreshes. A misleading "Session expired" message was also investigated while the authenticated dashboard remained accessible.

## 4. Timestamps
Timestamps were stored without timezone information and different UI paths applied different timezone conversions. This caused inconsistent displayed times.

The application now uses timezone-aware timestamps and a single configured display timezone.

## 5. Mobile UI
The mobile layout used fixed minimum widths that caused horizontal overflow on phone-sized screens. The responsive layout was corrected and the mobile password field was changed to a masked input.

## 6. Demo Account
`night@shiftlog.test` was created without `is_active = true`. Since inactive users are rejected during login, the seed data was corrected.