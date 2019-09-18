const PostController = require("../controllers/PostController");
const LikeController = require("../controllers/LikeController");
const express = require("express");
const multer = require("multer");
const configUpload = require("../config/upload");
const routes = new express.Router;
const upload = multer(configUpload);

routes.get('/posts',PostController.index);
routes.post('/posts',upload.single('image'),PostController.store);
routes.post('/posts/:id/like',LikeController.store);

module.exports = routes;