// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Create connection to MySQL
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Jithinammu1",
//   database: "banner_db"
// });

// // Connecting to MySQL
// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// // Get current banner settings
// app.get('/api/banner', (req, res) => {
//   const sql = "SELECT * FROM banner_settings ORDER BY id DESC LIMIT 1";
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.log("Error: ", err);
//       return res.json(err);
//     }
//     return res.json(data[0]);
//   });
// });

// // Update banner settings
// app.post('/api/banner', (req, res) => {
//   const { description, visible, timer, link } = req.body;

//   const sql = 'INSERT INTO banner_settings (description, visible, timer, link) VALUES (?, ?, ?, ?)';
//   db.query(sql, [description, visible, timer, link], (err, results) => {
//     if (err) {
//       console.log("Error: ", err);
//       return res.status(500).send(err);
//     }
//     res.send('Banner settings updated');
//   });
// });

// // Start the server
// app.listen(5000, () => {
//   console.log("Listening on port 5000");
// });

// require('dotenv').config(); // Add this at the top of your file

// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Create connection to MySQL
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// // Connecting to MySQL
// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// // Get current banner settings
// app.get('/api/banner', (req, res) => {
//   const sql = "SELECT * FROM banner_settings ORDER BY id DESC LIMIT 1";
//   db.query(sql, (err, data) => {
//     if (err) {
//       console.log("Error: ", err);
//       return res.json(err);
//     }
//     return res.json(data[0]);
//   });
// });

// // Update banner settings
// app.post('/api/banner', (req, res) => {
//   const { description, visible, timer, link } = req.body;

//   const sql = 'INSERT INTO banner_settings (description, visible, timer, link) VALUES (?, ?, ?, ?)';
//   db.query(sql, [description, visible, timer, link], (err, results) => {
//     if (err) {
//       console.log("Error: ", err);
//       return res.status(500).send(err);
//     }
//     res.send('Banner settings updated');
//   });
// });

// module.exports = app;
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create connection to MySQL
console.log("host:",process.env.DB_HOST)
console.log("db name:",process.env.DB_NAME)
console.log("db user:",process.env.DB_USER)
console.log("db PASS:",process.env.DB_PASSWORD)


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connecting to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


app.get("/", (req, res) => {
  const sql = "SELECT * FROM banner_settings ORDER BY id DESC LIMIT 1";
  db.query(sql, (err, data) => {
    if (err) {
      console.log("Error: ", err);
      // return res.json(err);
    }
    console.log(data[0])
    // return res.json(data[0]);
    res.send("hello world");
  });
  
});

app.listen(5001, () => console.log("Server ready on port 5000."));

module.exports = app;
