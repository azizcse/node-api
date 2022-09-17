require('dotenv').config()
const Pool = require('pg').Pool
const jwt = require('jsonwebtoken')

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
})
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const loggin = (req, res) => {
    const { email, password } = req.body
    
    if(email && password){
        console.log(email+ ' : '+password)
        pool.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password], async (err, result) => {
            if (err) {
                res.json({ message: "Server error" })
            }
    
            if(result.rows.length == 0){
                res.json({message:"No user found"})
            }
            let user = result.rows[0];
            user.accessToken = genereateAccessToken(user)
            user.refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            res.json(user)
    
        })
    }else{
        res.json({ message: "Email or password can not be empty" })
    }
    
}

function genereateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'48h'});
 }

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user;
        next()
    });
}

const createUser = (request, response) => {
    const { first_name, last_name, email, password } = request.body

    console.log("User name :" + first_name + " " + last_name)

    pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3,$4)', [first_name, last_name, email, password], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loggin,
}