const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "restaurant_db"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to database.');
})

app.get('/',(req,res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
})

app.get('/menu',(req,res) => {
    const sql = "select * from menu";
    db.query(sql, (err,result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    })
})

app.post('/signup',(req,res) => {
    const sql = "Insert into users (username,email,password) values (?,?,?)";
    const values = [req.body.username, req.body.email, req.body.password];
    db.query(sql,values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
})

app.post('/login',(req,res) => {
    const sql = "select * from users where email = ?";
    const values = [req.body.email];
    db.query(sql,values, async(err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(401).json({ error: 'User not found' });

        const user = result[0];
        const match = req.body.password === user.password

        if (!match) return res.status(401).json({ error: 'Invalid password' });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            isLoggedIn: true,
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          });
    });
})

//have to work on this
app.post('/api/cart/add',(req,res) => {
    const sql = "Insert into "
    const items = req.body;
    console.log("recieved items: ",items)

    res.json({message: 'Items recieved', items})
})


app.listen(5000,() => {
    console.log('Server is running on port 5000');
});