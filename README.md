# ShiftLog

ShiftLog is a small shift activity app for two sites: `main` and `north`.
Users can sign in, view shift entries, add entries, and remove entries.

## Features

- Login for operators, technicians, and supervisors.
- Dashboard with recent shift entries.
- Add and delete shift entries.
- Backend health check on the login page.
- Consistent timestamp display using the configured server timezone.
- Android-friendly login layout with password visibility toggle.

## Prerequisites

- Node.js 18 or newer
- npm
- A cloud PostgreSQL database

## Configuration

Copy the example environment files in server and web:

```powershell
Copy-Item server/.env.example server/.env
Copy-Item web/.env.example web/.env.local
```

Set these values in `server/.env`:

```text
DATABASE_URL= cloud db connection string 
ALLOWED_ORIGIN=http://localhost:5173
SESSION_SECRET=use-a-random-secret
```

Set the API address in `web/.env.local`:

```text
VITE_API_URL=http://localhost:4000
``

## Install

Install dependencies in both projects:

```powershell
cd server
npm install
cd ..\web
npm install
```

## Initialize the Database

Run the setup script from the `server` directory:

```powershell
cd server
node scripts/setup.js
```

The script creates the schema, creates all demo accounts, and loads reference
shift entries. It drops and recreates the application tables, so it deletes
existing users and entries. Run it only when that reset is acceptable.

## Run Locally

Open two terminals.

Terminal 1, API:

```powershell
cd server
npm run dev
```

The API listens on `http://localhost:4000`.

Terminal 2, frontend:

```powershell
cd web
npm run dev
```

Open `http://localhost:5173` in a browser.


## Demo Accounts

All demo accounts use the password `Shift@2026`:

| Email | Role |
| --- | --- |
| `supervisor@shiftlog.test` | Supervisor |
| `operator@shiftlog.test` | Operator |
| `tech@shiftlog.test` | Technician |
| `night@shiftlog.test` | Operator |

## Mobile Setup

For an Android emulator, set:

```text
VITE_API_URL=http://10.0.2.2:4000
```

For a physical phone, replace `localhost` with the computer's local IP, for
example `http://192.168.1.100:4000`. Set `ALLOWED_ORIGIN` to the URL used to
open the frontend on the phone. Restart both servers after changing settings.
After changing environment files, restart both the API and Vite servers.

## Project Structure

```text
ShiftLog/
├── server/
│   ├── src/
│   │   ├── config.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── ...
│   ├── scripts/
│   │   ├── setup.js
│   │   └── ...
│   ├── schema.sql
│   ├── seed.sql
│   ├── package.json
│   └── .env.example
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── FINDINGS.md
├── DECISIONS.md
├── LIMITS.md
├── AI_LOG.md
└── README.md