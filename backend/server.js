// =============================================
// Inriser - Backend Server
// Yeh Express server hai jo PostgreSQL database
// se profile data read aur update karta hai.
// Mobile app isse API calls ke through connect hoti hai.
// =============================================

// .env file se environment variables load karo
// Isme database password jaise sensitive cheezein hoti hain
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

// CORS enable karo taaki mobile app se requests aa sakein
app.use(cors())
// JSON body parse karo incoming requests mein
app.use(express.json())

// PostgreSQL database connection setup
// Credentials .env file se aa rahe hain (security ke liye)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
})

// Server ka port bhi .env se aayega
const PORT = process.env.PORT || 5000

// ---- GET /profile ----
// Profile data fetch karo database se
// Mobile app jab khole toh yeh call hota hai
app.get("/profile", async (req, res) => {
  try {
    // Database se pehla profile record lao
    const result = await pool.query("SELECT * FROM profile LIMIT 1")
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// ---- PUT /profile ----


// Profile data update karo database mein
// Jab user Save button press kare toh yeh call hota hai

app.put("/profile", async (req, res) => {
  try {
    const { display_name, bio, notifications_enabled } = req.body

    // --- Backend Validation ---
    // Display name khali nahi hona chahiye
    if (!display_name || display_name.trim() === "") {
      return res.status(400).json({ error: "Display name is required" })
    }

    // Database mein update karo aur updated row wapas bhejo
    const result = await pool.query(
      `UPDATE profile
       SET display_name=$1,
           bio=$2,
           notifications_enabled=$3,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=1
       RETURNING *`,
      [display_name.trim(), bio ? bio.trim() : "", notifications_enabled]
    )

    // Updated data ke saath response bhejo (updated_at bhi milega)
    res.json({
      message: "Profile updated successfully",
      updated_at: result.rows[0].updated_at
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Server start karo
app.listen(PORT, () => {
  console.log(`Inriser Backend running on http://localhost:${PORT}`)
})