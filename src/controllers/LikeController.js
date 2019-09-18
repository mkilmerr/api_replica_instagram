const Post = require("../model/Post");

module.exports = {
    store: async (req,res) =>{
        const id = req.params.id;
       const post = await Post.findById(id);

       post.likes += 1;
        await post.save();
        req.io.emit('like',post);
       res.send(post)
    }
}