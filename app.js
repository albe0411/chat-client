const express = require('express')
const app = express()
const mysql = require('mysql2')
const PORT = 3000
const cors = require('cors')

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'albe0411',
    password: 'IIwtpugiad10812',
    database: 'dbo',
    multipleStatements : false
})


app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root : __dirname});
})

app.get('/getMessage', (req, res) => {
    connection
        .promise()
        .query('SELECT * FROM messages')
        .then(([rows, fields]) => {
            console.log(rows)
            res.send(rows)
        })
        .catch(console.log)
})

app.post('/sendMessage', (req, res) => {
    console.log(req.body)
    connection
        .promise()
        .query(`INSERT INTO messages(message, username, time) VALUES ("${req.body["message"]}", "${req.body["username"]}", ${Math.floor(new Date().getTime() / 1000)})`)
        .then(([rows, fields]) => {
            res.sendStatus(200)
        })
        .catch(console.log)
})

app.listen(PORT, () => {
    console.log(`example app listening on port ${PORT}`)
})