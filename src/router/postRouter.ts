import express from "express"
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../database/UserDatabase";

export const postRouter = express.Router()
const postController = new PostController(
    new PostBusiness(
        new UserDatabase(),
        new PostDatabase(),
        new TokenManager(),
        new IdGenerator()
    )
);

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
