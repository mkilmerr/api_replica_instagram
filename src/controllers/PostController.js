const Post = require("../model/Post");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
module.exports = {
    async index(req,res){
        const post = await Post.find().sort('-createdAt');
        res.json(post)
    },
    
    async store(req,res){
        const { author,place,description,hashtags,likes} = req.body;
        const {filename : imageFile} = req.file;

        const nameArray = imageFile.split('.');
        const image = `${nameArray[0]}.jpg`;
        console.log(image)
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality:70})
        .toFile(
            path.resolve(req.file.destination,'resized',image)
        )

        fs.unlinkSync(req.file.path);
        
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            likes,
            image
        }) 
        req.io.emit('post',post);
        res.send(post)
        /*console.log(req.file.fieldname) */
    }
}