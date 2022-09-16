const blogList = (req, res)=>{
    res.send({message:"success",status:200})
}

const blogPost = (req, res)=>{
    res.send({message:"success",status:200, page:"Blogs post"})
}
const blogGetById =(req, res)=>{
    const id = req.params.id
    res.send({message:"success",status:200, page:"Blogs get with id :"+id})
}

const blogDelete = (req, res)=>{
    const id = req.params.id
    res.send({message:"success",status:200, page:"Blogs delete with id :"+id})
}

module.exports = {
    blogList,
    blogPost,
    blogGetById,
    blogDelete
}