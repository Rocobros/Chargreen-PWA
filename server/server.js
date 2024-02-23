const express = require('express')
const mysql = require('mysql')
const cors = require ('cors')

const app = express()
app.use(cors())
app.use(express.json())

try {
    
} catch (error) {
    
}

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
        return res.json(data[0])
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM credentials WHERE `username` = ? AND `password` = ?"
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err){
            return res.json('Error querying from credentials table')
        }else{
            if(data.length > 0){
                return res.json('Success')
            }else{
                return res.json('No record')
            }
        }
    })
})

app.post('/register/credentials', (req, res) => {
    const credentials = 'INSERT INTO credentials (`username`, `password`) VALUES (?)'

    const values = [req.body.user[0], req.body.pass[0]]
    
    db.query(credentials, [values], (err,data) => {
        if(err){
            console.log(err)
            return res.json('Error inserting to Credentials')
        }
        return res.json(data)
    })
})

app.post('/register/user', (req, res) => {

    const sql = 'INSERT INTO `users`(`name`, `apep`, `apem`, `cel`, `email`, `credentials_id`) VALUES (?)'
    const vals = [req.body.name[0], req.body.apep[0], req.body.apem[0], req.body.tel[0], req.body.email[0], req.body.fk[0]]

    db.query(sql, [vals], (err, data) => {
        if(err){
            console.log(err)
            return res.json('Error inserting to Users')
        }
        return res.json(data)
    })
})

app.listen(8081, () => {
    console.log('Listening on URL: http://localhost:8081/')
})