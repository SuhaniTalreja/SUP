const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
  host: '10.161.135.5',
  port: 3306,
  user: 'root',
  password: 'suhanimahi',
  database: 'athelink',
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

// SIGN UP FOR PLAYERS
app.post('/sign-up/player', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO player_signup (name, email, password) VALUES (?)";
  const values = [username, email, password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
});

// LOGIN FOR PLAYERS
app.post('/login/player', (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "SELECT * FROM player_signup WHERE email=? AND password=?";

  db.query(sql, [req.body.email,req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if(data.length > 0){
      return res.json("Success");
    } else{
      return res.json("Failed")
    }
  });
});

// PLAYER INFORMATION UPDATE
app.post('/user-profile',(req,res)=>{
  
})

app.listen(3000,()=>{
  console.log("Listening on port 3000");
})