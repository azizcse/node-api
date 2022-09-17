const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../db/queries')

router.post('/users', db.createUser);
router.get('/users', db.getUsers);
router.post('/login',db.loggin);



module.exports = router