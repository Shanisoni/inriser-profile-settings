# Inriser - Profile Settings

A React Native mobile app that loads and updates profile settings from a PostgreSQL database.

## Project Structure

```
inriser-profile-settings/
├── backend/
│   └── server.js              # Express API server (GET & PUT /profile)
├── mobile/
│   ├── app/
│   │   ├── _layout.tsx        # Expo Router layout
│   │   ├── index.js           # Entry point (renders ProfileScreen)
│   │   └── profile.js         # Profile settings screen (UI only)
│   └── src/
│       ├── hooks/
│       │   └── useProfile.js  # Custom hook (state, API, validation)
│       ├── styles/
│       │   └── profile.styles.js  # Profile screen styles
│       ├── theme/
│       │   └── tokens.js      # Design tokens (colors, spacing, etc.)
│       └── utils/
│           └── apiUrl.js      # Backend API URL configuration
```

## Features

- **Load profile** from PostgreSQL on app open
- **Edit display name** with validation (cannot be empty)
- **Edit bio** with character counter (150 max)
- **Toggle notifications** on/off
- **Save** changes to database with success/error feedback
- **Reset** to last saved values
- **Last updated timestamp** shown on screen

## Setup Instructions

### 1. PostgreSQL Database (pgAdmin)

Open pgAdmin, connect to your server, and create the database and table:

```sql
-- Step 1: Create database (agar already nahi hai)
CREATE DATABASE inriser_db;

-- Step 2: Connect to inriser_db, then create table
CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  display_name VARCHAR(80),
  bio VARCHAR(160),
  notifications_enabled BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Insert one default row
INSERT INTO profile (id, display_name, bio, notifications_enabled)
VALUES (1, 'Shani', 'Full Stack Engineer', true);
```

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with your database credentials:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=inriser_db
DB_PASSWORD=your_password_here
DB_PORT=5432
PORT=5000
```

Then start the server:

```bash
npm start
```

Server starts at `http://localhost:5000`

### 3. Mobile App

```bash
cd mobile
npm install
```

Update the IP address in `src/utils/apiUrl.js` to match your local machine's IP:

```js
export const API_URL = "http://<YOUR_LOCAL_IP>:5000";
```

Then start the app:

```bash
npx expo start -c
```

## How to Test with pgAdmin

### Test 1: Load Profile

1. Open the app on your phone/emulator
2. The profile screen should show the current values from the database
3. **Verify in pgAdmin:** Run `SELECT * FROM profile;` — the values on screen should match the database row

### Test 2: Save with Valid Data

1. Change the display name to something new (e.g., "Shani Dev")
2. Press **Save**
3. You should see a "Profile updated successfully!" alert
4. **Verify in pgAdmin:** Run `SELECT * FROM profile;` — the `display_name` column should now show "Shani Dev" and `updated_at` should be updated to the current time

### Test 3: Validation — Empty Display Name

1. Clear the display name field completely
2. Press **Save**
3. A red error message should appear: "Display name is required"
4. The save should NOT happen
5. **Verify in pgAdmin:** Run `SELECT * FROM profile;` — the row should be unchanged

### Test 4: Reset Button

1. Change the display name and bio to something new
2. Press **Reset** (instead of Save)
3. The fields should revert to the last saved values
4. **Verify in pgAdmin:** Run `SELECT * FROM profile;` — no changes should appear

### Test 5: App Restart

1. Save some changes
2. Close the app completely
3. Reopen the app
4. The saved values should still be there (loaded fresh from database)

## What Changes in the Database After Save

When the user presses Save, the backend runs this SQL:

```sql
UPDATE profile
SET display_name = '<new value>',
    bio = '<new value>',
    notifications_enabled = <true/false>,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
```

**Columns that change:**
- `display_name` — updated to whatever the user typed
- `bio` — updated to whatever the user typed
- `notifications_enabled` — updated to true or false
- `updated_at` — automatically set to the current date and time

**Columns that do NOT change:**
- `id` — always stays 1

## API Endpoints

| Method | Endpoint    | Description                |
|--------|-------------|----------------------------|
| GET    | `/profile`  | Fetch current profile data |
| PUT    | `/profile`  | Update profile data        |

### PUT /profile — Request Body

```json
{
  "display_name": "Shani",
  "bio": "Full Stack Engineer",
  "notifications_enabled": true
}
```

### PUT /profile — Validation

- `display_name` is required and cannot be empty
- If empty, returns `400 Bad Request` with error message
