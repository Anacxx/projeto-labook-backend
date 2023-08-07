
import { Response, Request } from "express";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/getPosts.dto";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostOutputDTO, CreatePostSchema } from "../dtos/createPost.dto";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
import { EditPostSchema } from "../dtos/editPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO, DeletePostSchema } from "../dtos/deletePost.dto";
export class PostController{
    constructor(
      private postBusiness: PostBusiness
    ){}
        // Com DTO PRONTO FUNCIONANDO
      public getAllPosts = async (req: Request, res: Response) => {
        try {
          const input: GetPostsInputDTO = undefined

          const output: GetPostsOutputDTO = await this.postBusiness.getAllPosts(input)
          return res.status(200).send(output);
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };
      // Com DTO PRONTO FUNCIONANDO
      public createPost = async (req: Request, res: Response) => {
        try {
          const input = CreatePostSchema.parse({ 
            id: req.body.id, 
            creator_id: req.body.creator_id, 
            content: req.body.content 
          })

          const output:CreatePostOutputDTO = await this.postBusiness.createPost(input)
          return res.status(201).send(output);
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };
      //Com DTO PRONTO FUNCIONANDO
      public editPost = async (req: Request, res: Response) => {
        try {
          const input = EditPostSchema.parse({
            id: req.params.id,
            content: req.body.content
          })

          await this.postBusiness.editPost(input)
          return res.status(200).send('Post updated successfully');
        } catch (error) {
          console.log(error)
          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };
      //Com DTO PRONTO FUNCIONANDO
      public deletePost = async (req: Request, res: Response) => {
        try {
          const input: DeletePostInputDTO = {
            id: req.params.id,
          }
          const output: DeletePostOutputDTO = await this.postBusiness.deletePost(input)
          return res.status(200).send(output);
        } catch (error) {
          console.log(error)
          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };
      // NÃO FUNCIONA TUDO ERRADO
      public likeDislikePost = async (req: Request, res: Response) => {
        try {
          const input = {
             user_id: req.body.user_id,
             post_id: req.params.post_id,
             like: req.body.like
           }

          const output = await this.postBusiness.likeDislikePost(input);
          return res.status(200).send(output);
        } catch (error) {
          console.log(error)

          if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
          } else if (error instanceof ZodError) {
            res.status(400).send(error.issues)
          } else {
            res.status(500).send("Unexpected error")
          }
        }
      };
}
