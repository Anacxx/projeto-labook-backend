import express from "express"
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";

export const postRouter = express.Router()
const postController = new PostController(new PostBusiness(new PostDatabase()));

//getAllPosts
postRouter.get('/', postController.getAllPosts);
//CreatePost
postRouter.post('/', postController.createPost);
//editPost
postRouter.put('/:id', postController.editPost);
//deletePost
postRouter.delete('/:id', postController.deletePost);
//likeDislike
postRouter.put('/:id/like', postController.likeDislikePost);
