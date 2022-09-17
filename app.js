const express = require('express')
const app = express()
const multer = require('multer');
const upload = multer();

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


const blogRouters = require('./routes/blogRoutes')
const authRouter = require('./routes/authRoute')


app.get('/about', (req, res)=>{
    res.send({message:"Success", page:"About page"})
})

app.get('/',(req,res)=>{
    res.redirect('/blogs')
})

app.use('/blogs',blogRouters)
app.use('/v1',authRouter)

app.listen(3000, ()=>console.log("Server started"))