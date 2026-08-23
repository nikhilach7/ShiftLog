# AI Usage Log

AI was used for targeted investigation, debugging, and implementation.

## 1. CORS

**Prompt:**
> Investigate and  suggest fixes for the CORS issue in the ShiftLog app. 

## 2. Dashboard

**Prompt:**
> Fix the blank dashboard issue in the ShiftLog app. Inspect DashboardPage.jsx and identify why the /entries API request is being triggered repeatedly or causing a render loop. Make the smallest necessary fix, without changing unrelated functionality. Briefly explain the root cause and the fix.
---

## 3. Authentication / Session

**Prompt:**
> Fix the remaining authentication issue in the ShiftLog app. Login works, the dashboard loads, and creating entries works, but after refreshing the page the app shows "Session expired". Trace how the authentication token is stored before refresh and restored after refresh. Identify the root cause and make the smallest necessary fix so a valid session survives a browser refresh.


---

## 4. Timestamp / Timezone

**Investigation prompt:**
> Investigate the timestamp/timezone handling in the ShiftLog app. Trace a shift entry timestamp from the database through the backend API to the React UI and identify where timezone conversion occurs. Check for inconsistencies between backend formatting and frontend/local browser formatting. Do not change any code yet.


---

## 5. Mobile Login

**Prompt:**
> Fix only the Android/mobile login payload issue and responsive ui and also password field with invisibility

---



## 8. Demo Account

**Prompt:**
> what is reason for demo account night shift not logging in .