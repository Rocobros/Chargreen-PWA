const express = require('express')
const mysql = require('mysql')
const cors = require ('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pwa_db'
})

app.get('/fk', (req, res) => {
    const get_fk = 'SELECT MAX(id) AS id from credentials'
    db.query(get_fk, (err, data) => {
        if(err){
            return res.json('Error')
        }
        return res.json(data)
    })
})

app.post('/register', (req, res) => {
    const credentials = 'INSERT INTO credentials (username, password) VALUES (?)'
    const credential_values = [
        req.body.user,
        req.body.pass
    ]

    db.query(credentials, [credential_values], (err) => {
        if(err){
            return res.json('Error inserting to Credentials')
        }
    })

    const info = 'INSERT INTO users (name, apep, apem, cel, email, credentials_id) VALUES (?)'
    const info_values = [
        req.body.name,
        req.body.apep,
        req.body.apem,
        req.body.cel,
        req.body.email,
        req.body.fk
    ]

    db.query(info, [info_values], (err, data) => {
        if(err){
            return res.json('Error inserting to Users')
        }
        return res.json(data)
    })
})

app.listen(8081, () => {
    console.log('Listening on URL: http://localhost:8081/')
})