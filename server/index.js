const express = require('express');
const app = express();
const mysql = require('mysql2');
const mysql_link = {
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bbl_development',
  socketPath: '/tmp/mysql.sock'
}
const db = mysql.createPool(mysql_link);
const connection = mysql.createConnection(mysql_link);
const corsOptions ={
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
const cors = require('cors');

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// checking mysql connection
connection.connect(function(err){
  if(err != null){
    console.log(err)
  }
});

// default route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// endpoint for creating log
app.post('/api/logs', (req, res) => {
  const sql = "INSERT INTO logs (reference, book, borrower) VALUES (?,?,?)";
  const reference = req.body.reference;
  const book = req.body.book;
  const borrower = req.body.borrower;

  db.query(sql, [reference, book, borrower], (err, result) => {
    db.query("SELECT * FROM logs WHERE id = (SELECT LAST_INSERT_ID())", (e, r) => {
      res.send(r);
    });
  });
});

// endpoint for listing logs
app.get('/api/logs', (req, res) => {
  const sql = "SELECT * FROM logs ORDER BY id DESC";
  db.query(sql, (err, result) => {
    res.send(result)
  });
});

// endpoint for getting specific log
app.get('/api/logs/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM logs WHERE id = ?";

  db.query(sql, id, (e, r) => {
    res.send(r)
  })
});

// endpoint for updating logs
app.patch('/api/logs/:id', (req, res) => {
  const id = req.params.id;
  const reference = req.body.reference;
  const book = req.body.book;
  const borrower = req.body.borrower;
  const sql =  "UPDATE logs SET reference = ?, book = ?, borrower = ? \
                WHERE id = ?";

  db.query(sql, [reference, book, borrower, id], (err, result) => {
    res.send(result)
  });
});

// endpoint for return book
app.patch('/api/logs/:reference/return', (req, res) => {
  const reference = req.params.reference;
  const sql = "UPDATE logs SET returned_at = NOW() WHERE reference = ?";

  db.query(sql, reference, (err, result) => {
    res.send(result)
  })
});

// endpoint for deleting a log
app.delete('/api/logs/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM logs WHERE id = ?";

  db.query(sql, id, (err, result) => {
    res.send(result)
  })
});

// endpoint for getting log by reference
app.get('/api/logs/reference/:ref', (req, res) => {
  const ref = req.params.ref;
  const sql = "SELECT * FROM logs WHERE reference = ?";

  db.query(sql, ref, (e, r) => {
    res.send(r)
  });
});

// server
app.listen(3001, () => {
  console.log('running on port 3001');
});