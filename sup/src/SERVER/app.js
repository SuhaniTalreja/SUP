const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

// 🔹 Enable CORS for Frontend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001" , "http://localhost:3002"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ Connection Pooling
const pool = mysql.createPool({
  host: "10.161.243.47",
  port: 3306,
  user: "root",
  password: "suhanimahi",
  database: "athelink",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Store Sessions in MySQL
const sessionStore = new MySQLStore({}, pool);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// 🔹 Test MySQL Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL Database");
    connection.release();
  }
});

// PLAYER SIDE

// 🚀 SIGN UP FOR PLAYERS (With Password Hashing)
app.post("/sign-up/player", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO player_signup (name, email, password) VALUES (?, ?, ?)";
    pool.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      return res
        .status(201)
        .json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Hashing Error:", error);
    return res.status(500).json({ error: "Error hashing password" });
  }
});

// 🚀 LOGIN FOR PLAYERS
app.post("/login/player", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "SELECT playerId, name, password FROM player_signup WHERE email = ?";

  pool.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (data.length > 0) {
      const storedPassword = data[0].password;
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (passwordMatch) {
        req.session.playerId = data[0].playerId;
        req.session.username = data[0].name;

        return res.json({
          success: true,
          message: "Login successful",
          playerId: data[0].playerId,
          username: data[0].name,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  });
});

// 🚀 DASHBOARD USERNAME & ID CHECK
app.get("/dashboard", (req, res) => {
  if (req.session.playerId) {
    const playerId = req.session.playerId;
    const query = "SELECT sport FROM player_info WHERE playerId = ?";

    pool.query(query, [playerId], (err, results) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length > 0) {
        return res.json({
          valid: true,
          username: req.session.username,
          playerId: req.session.playerId,
          sport: results[0].sport, // Include the sport in the response
        });
      } else {
        return res.status(404).json({ error: "Player not found" });
      }
    });
  } else {
    return res.json({ valid: false });
  }
});


// 🚀 FETCH PLAYER INFORMATION (Combining player_signup and player_info)
app.get("/user-profile", (req, res) => {
  if (!req.session.playerId) {
    return res.status(401).json({ error: "Unauthorized: Please log in" });
  }

  const sql = `
    SELECT ps.email, pi.dob, pi.age, pi.gender, pi.institute, pi.sport, pi.level, pi.linkedin_url, pi.instagram_url, pi.photo_url 
    FROM player_signup ps
    LEFT JOIN player_info pi ON ps.playerId = pi.playerId
    WHERE ps.playerId = ?
  `;

  pool.query(sql, [req.session.playerId], (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (data.length > 0) {
      return res.json(data[0]); // Return combined profile data
    } else {
      return res.json({}); // Return empty object if no profile data exists
    }
  });
});

// 🚀 UPDATE/INSERT PLAYER PROFILE INFORMATION
app.post("/update-profile", (req, res) => {
  if (!req.session.playerId) {
    return res.status(401).json({ error: "Unauthorized: Please log in" });
  }

  const { dob, age, gender, institute, sport, level, linkedin_url, instagram_url, photo_url } = req.body;
  const playerId = req.session.playerId;

  // Check if the profile exists
  const checkSql = "SELECT playerId FROM player_info WHERE playerId = ?";
  pool.query(checkSql, [playerId], (err, data) => {
    if (err) {
      console.error("Database Check Error:", err.sqlMessage);
      return res.status(500).json({ error: "Database error" });
    }

    if (data.length > 0) {
      // UPDATE existing profile
      const updateSql = `
        UPDATE player_info 
        SET dob = ?, age = ?, gender = ?, institute = ?, sport = ?, level = ?, linkedin_url = ?, instagram_url = ?, photo_url = ?
        WHERE playerId = ?
      `;

      pool.query(
        updateSql,
        [dob, age, gender, institute, sport, level, linkedin_url, instagram_url, photo_url, playerId],
        (err) => {
          if (err) {
            console.error("Update Error:", err.sqlMessage);
            return res.status(500).json({ error: "Error updating profile" });
          }
          return res.json({ success: true, message: "Profile updated successfully" });
        }
      );
    } else {
      // INSERT new profile
      const insertSql = `
        INSERT INTO player_info 
        (playerId, dob, age, gender, institute, sport, level, linkedin_url, instagram_url, photo_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      pool.query(
        insertSql,
        [playerId, dob, age, gender, institute, sport, level, linkedin_url, instagram_url, photo_url],
        (err) => {
          if (err) {
            console.error("Insert Error:", err.sqlMessage);
            return res.status(500).json({ error: "Error inserting profile" });
          }
          return res.json({ success: true, message: "Profile created successfully" });
        }
      );
    }
    
  });
});

// 🚀 MATCHES
app.get("/matches", (req, res) => {
  pool.query("SELECT * FROM matches WHERE is_open = 1", (err, results) => {
    if (err) {
      console.error("Error fetching matches:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ AUTO-RECONNECT ON DATABASE ERROR
pool.on("error", (err) => {
  console.error("MySQL Pool Error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Reconnecting to MySQL...");
    pool.getConnection((error, connection) => {
      if (error) {
        console.error("Reconnection failed:", error);
      } else {
        console.log("Reconnected to MySQL");
        connection.release();
      }
    });
  } 
});

// 🚀 FETCH UPCOMING MATCHES FROM DATABASE
app.get("/upcoming-matches", (req, res) => {
  const sql = "SELECT match_id, tournament, sport, level, match_date, match_time, venue, poster_url FROM matches WHERE is_open = 1 ORDER BY match_date ASC";

  pool.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching matches:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


// 🚀 LOGOUT ROUTE
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    return res.json({ success: true, message: "Logged out successfully" });
    res.clearCookie("connect.sid"); // Clear session cookie
  });
});


// COACH SIDE


//COACH LOGIN
app.post('/login/coach', (req, res) => {
  const { name, email, password } = req.body;
  console.log("Login Request Received:",name , email, password);

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "SELECT * FROM coach_signup WHERE email=? AND password=?";

  pool.query(sql, [req.body.email,req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if(data.length > 0){
      req.session.coachId = data[0].coachId;  
      req.session.name = data[0].name;
      console.log(req.session.coachId);
      return res.status(200).json({ status: "Success", name: req.session.name });
    } else{
      return res.status(401).json({ status: "Failed", message: "Invalid credentials" });
    }
  });
});

// GET COACH NAME
app.get('/get-coach-name', (req, res) => {
  if (req.session.name) {
    return res.json({ name: req.session.name });
  } else {
    return res.status(401).json({ error: "Not authenticated" });
  }
});

//REGISTER MATCH
app.post("/register-match", (req, res) => {
  const {
    tournament,
    sport,
    level,
    age_group,
    match_date,
    match_time,
    venue,
    registration_link,
    poster_url,
    // player_id,
  } = req.body;

  const sql = `INSERT INTO matches (tournament, sport, level, age_group, match_date, match_time, venue, registration_link, poster_url) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [tournament, sport, level, age_group, match_date, match_time, venue, registration_link, poster_url],
    (err, result) => {
      if (err) {
        console.error("Error inserting match:", err);
        res.status(500).json({ message: "Database error" });
      } else {
        res.status(201).json({ message: "Match registered successfully!", match_id: result.insertId });
      }
    }
  );
});

// FETCH ALL MATCHES
app.get("/update-match", (req, res) => {
  const sql = "SELECT * FROM matches";
  pool.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

// Route to fetch all players
app.get('/get-players', (req, res) => {
  const query = 'SELECT playerId, name FROM player_signup';  // Adjust your table name accordingly

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching players:', err);
      res.status(500).json({ error: 'Failed to fetch players' });
    } else {
      res.json(results); // Send the player data back as a JSON response
    }
  });
});

app.post("/save-winners/:matchId", (req, res) => {
  const { winners } = req.body;
  const { matchId } = req.params;

  // Ensure the winners object is in the expected format and contains player IDs
  if (!winners || !Array.isArray(winners.players) || winners.players.length === 0) {
      return res.status(400).json({ error: "Invalid winners list." });
  }

  const sanitizedWinners = winners.players.filter(id => Number.isInteger(id));

  if (sanitizedWinners.length === 0) {
      return res.status(400).json({ error: "No valid player IDs found." });
  }

  // Prepare query for inserting the JSON object
  const query = "INSERT INTO match_winners (match_id, player_data) VALUES (?, ?)";
  const values = [matchId, JSON.stringify({ players: sanitizedWinners })];

  // Execute query without async/await
  pool.query(query, values, (error, results) => {
      if (error) {
          console.error("Error saving winners:", error);
          return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json({ message: "Winners saved successfully!", affectedRows: results.affectedRows });
  });
});


//CLOSE REGISTERATION
app.post("/close-registration/:matchId", (req, res) => {
  const { matchId } = req.params;

  // Update the isOpen column to 0 for the specified match
  const query = "UPDATE matches SET is_open = 0 WHERE match_id = ?";

  pool.query(query, [matchId], (error, results) => {
    if (error) {
      console.error("Error closing registration:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Registration closed successfully!" });
  });
});




// 🚀 Start the Server on port 3001
app.listen(3001, () => {
  console.log("Server running on port 3001");
});