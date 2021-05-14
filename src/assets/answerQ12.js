
import mongoose from 'mongoose';
const { Schema } = mongoose;

  const blogSchema = new Schema({
    title:  String, 
    author: String,
    body:   String,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
 });


const Blog = mongoose.model('Blog', blogSchema);

// controller.js will apply service uses DI
app.post('/api/blogs', function (req, res) {
    const ret = blogService.addBlog(req.body, req.session.userid);
    res.json(ret);
});

// service.js will apply repo uses DI
function addBlog(body,id){
   return repo.addBlog(body, id);
}

// repo.js that abstract the DB layer; use ODM or ORM 
async function addBlog(body,id){
    const blog = new Blog(body);
    blog.author = id;
    return await blog.save();
}


