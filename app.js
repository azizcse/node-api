const express = require('express')
const app = express()
app.use(express.json())

const blogRouters = require('./routes/blogRoutes')


app.get('/about', (req, res)=>{
    res.send({message:"Success", page:"About page"})
})

app.get('/',(req,res)=>{
    res.redirect('/blogs')
})

app.use('/blogs',blogRouters)

app.listen(3000, ()=>console.log("Server started"))