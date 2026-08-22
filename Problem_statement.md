# Full Stack Internship Assignment — ShiftLog

## Context

ShiftLog is a small internal tool. Operators log what they did on shift, and
supervisors review it. It runs at two sites in different regions.

The last developer left mid-sprint. The repository in front of you is exactly
what they handed over. It was working on their machine.

It does not work now.

Your job is to make it work, and to be able to explain why it didn't.

---

## What you are given

```
server/     Express API (Node, plain JavaScript)
web/        React frontend (Vite)
server/db/  Schema and reference data
```

There is no other documentation. There are no tickets. There is no changelog.
What you see is what the previous developer left.

Some parts of this codebase are finished. Some parts are half-finished. Some
parts are wired up to nothing at all. Working out which is which is part of
the assignment — do not assume that everything present is meant to be there,
and do not assume that everything missing was an oversight.

---

## Setup

You need your own cloud Postgres database. Free tiers from Neon, Supabase,
Render, or Aiven are all fine. Do not use a local Postgres — we want you to
deal with a real remote database.

1. Create a database and copy its connection string.
2. `cp server/.env.example server/.env` and fill it in.
3. `cp web/.env.example web/.env.local` and fill it in.
4. Install dependencies in `server/` and in `web/`.
5. Run the database setup script in `server/`.
6. Start the API. Start the frontend.

Demo accounts (all share the password `Shift@2026`):

```
supervisor@shiftlog.test
operator@shiftlog.test
tech@shiftlog.test
night@shiftlog.test
```

Every one of these accounts is supposed to work.

---

## The work

### Part 1 — Make it run

Get the application to a state where a person can sign in, see the shift log,
add an entry, sign out, sign back in, and refresh the page at any point
without losing their session.

Right now, none of that is true.

### Part 2 — Timestamps

The two sites are in different regions. Timestamps in this application are
currently wrong, and they are wrong in more than one way. Depending on where
you look, the same event can appear at two different times, and neither of
them is necessarily correct.

Decide what "correct" means here, implement it, and write down the rule you
chose. There is more than one defensible answer. We care about the reasoning
more than the answer.

### Part 3 — The interface

The dashboard has rendering problems. Some are visible immediately. Some only
show up when you interact with the page, when data changes, or when the list
is empty.

Open the browser console and keep it open. It is telling you things.

### Part 4 — Android

Open the app on an Android device or an Android emulator, or use Chrome
DevTools device emulation with an Android user agent. Do not skip this by
just narrowing your desktop window — the application does not behave the same
way.

The Android experience is the worst part of this product. Fix it. You are not
being asked to redesign the product; you are being asked to make it usable on
a phone held in one hand by someone standing on a factory floor.

### Part 5 — Write it up

See deliverables.

---

## Deliverables

Submit a Git repository containing your work, with these files at the root.

**`FINDINGS.md`** — one section per problem you found. For each:

- What the symptom was.
- What the actual cause was.
- Why that cause produced that symptom. This is the part we read most
  carefully. "Fixed the CORS config" tells us nothing. "The browser sends a
  preflight OPTIONS request before the POST, the server's allowed-origin
  value did not match the dev server's port, so the real request was never
  sent" tells us everything.
- What you changed.

If you found a problem and chose not to fix it, say so and say why.

**`DECISIONS.md`** — every point where the codebase did not tell you what it
wanted, and you had to decide. What was ambiguous, what you picked, what you
gave up by picking it.

**`LIMITS.md`** — where your solution still breaks. What you would do with
three more days. What you did not have time to verify.

**`AI_LOG.md`** — see below.

Do not squash your history into a single commit. We read commit history.

---

## Rules

**AI tools are allowed.** Use whatever you normally use.

**Every prompt goes in `AI_LOG.md`.** Prompts and the tool you used. Not the
responses, just the prompts. A short log is not a problem. An empty log had
better be true.

**You will present this work live.** Expect a screen share of roughly forty
minutes. You will walk us through your code, we will ask why you made
specific choices, and then we will hand you a new requirement and ask you to
implement it while we watch. You may use AI during that session too.

The live session is the largest part of your score. Code you cannot explain
is worth less to us than less code you can.

**Timebox: eight hours of real work.** We mean it. We would rather see four
problems understood deeply than fourteen patched over. If you run out of
time, say so in `LIMITS.md` and submit what you have.

---

## How this is scored

| Weight | What we are looking at |
|-------:|------------------------|
| 35% | The live session — how well you navigate and extend your own code |
| 25% | `FINDINGS.md` and `DECISIONS.md` — mechanisms and judgement |
| 20% | Correctness — edge cases, error paths, does authentication actually hold |
| 10% | Commit history — incremental, readable, honest |
| 10% | Code quality |

Nothing is scored on visual polish beyond Part 4's usability requirement.

---

## Submission

Push to a private repository and share access, or send an archive. Include
your `.env.example` files. Do not include your `.env` files, and do not
include your database credentials anywhere in the repository. If we find a
live credential in your submission, that alone ends the process.
